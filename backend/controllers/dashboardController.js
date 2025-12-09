const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const redis = require('redis');

// Redis Client Setup (Ensure Redis server is running)
const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect().catch(console.error);

const getSchoolStats = asyncHandler(async (req, res) => {
    const { schoolId } = req.user;
    const cacheKey = `dashboard_stats_${schoolId}`;

    // 1. Check Redis Cache First
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
        console.log('⚡ Serving from Cache');
        return res.json(JSON.parse(cachedData));
    }

    // 2. If not in Cache, Calculate from DB (Expensive Operation)
    console.log('🐌 Serving from Database');

    const totalStudents = await Student.countDocuments({ schoolId });

    // Aggregate to sum fees (High Performance Calculation)
    const feeStats = await Student.aggregate([
        { $match: { schoolId: new mongoose.Types.ObjectId(schoolId) } },
        { $group: { _id: null, totalDue: { $sum: "$fees.due" }, totalPaid: { $sum: "$fees.paid" } } }
    ]);

    const stats = {
        students: totalStudents,
        revenue: feeStats[0]?.totalPaid || 0,
        pending: feeStats[0]?.totalDue || 0
    };

    // 3. Save to Redis for 10 Minutes (600 seconds)
    // Isse DB par load 99% kam ho jayega
    await client.setEx(cacheKey, 600, JSON.stringify(stats));

    res.json(stats);
});

module.exports = { getSchoolStats };