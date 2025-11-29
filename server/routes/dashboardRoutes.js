const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const totalTenants = await Tenant.countDocuments();
        const totalStudentsResult = await Tenant.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$studentCount' }
                }
            }
        ]);
        const totalStudents = totalStudentsResult.length > 0 ? totalStudentsResult[0].total : 0;

        // Dummy revenue calculation for now
        const totalRevenue = totalTenants * 37500; // Example: 120 tenants * 37500 per tenant

        // Hardcoded pending dues for now
        const pendingDues = 25000;

        res.json({
            tenants: totalTenants,
            students: totalStudents,
            revenue: totalRevenue,
            dues: pendingDues,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
