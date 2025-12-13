const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to Live Database...");

        const users = await User.find({});

        if (users.length === 0) {
            console.log("❌ Database Pura KHALI hai! (No Users Found)");
            console.log("👉 Solution: node seed.js chalayein.");
        } else {
            console.log(`✅ Total ${users.length} Users Found:`);
            console.log("------------------------------------------------");
            users.forEach(u => {
                console.log(`Role: ${u.role} | Email: ${u.email} | ID: ${u.employeeId || u.enrollmentId || 'N/A'}`);
            });
            console.log("------------------------------------------------");
            console.log("👆 Inme se koi ek ID/Email copy karke Login karein.");
        }
        process.exit();
    } catch (error) {
        console.error("Error:", error);
    }
};

checkDB();