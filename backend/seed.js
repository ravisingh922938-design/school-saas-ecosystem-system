const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// User Model ka path check karein (Agar models folder me User.js hai)
const User = require('./models/User');

dotenv.config();

const schools = [
    { name: "Delhi Public School", code: "DPS" },
    { name: "St. Xavier's High", code: "STX" },
    { name: "Ryan International", code: "RYN" },
    { name: "Green Valley Academy", code: "GVA" },
    { name: "Modern School", code: "MOD" }
];

const seedDatabase = async () => {
    try {
        // Database Connect
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected...");

        // Purana Data Saaf Karein
        await User.deleteMany({});
        console.log("🗑️ Old Data Cleared.");

        const users = [];

        // 1. Super Admin
        const hashedAdminPass = await bcrypt.hash("admin123", 10);
        users.push({
            name: "Super Admin",
            email: "admin@saas.com",
            password: hashedAdminPass,
            role: "super-admin",
            schoolId: null
        });

        // 2. Schools Loop
        for (let i = 0; i < schools.length; i++) {
            const school = schools[i];
            const schoolIndex = i + 1;

            // Principal
            const principalPass = await bcrypt.hash(`school${schoolIndex}`, 10);
            users.push({
                name: `Principal - ${school.name}`,
                email: `principal@school${schoolIndex}.com`,
                password: principalPass,
                role: "school",
                schoolId: school.code
            });

            // Teacher (1 per school for demo)
            const teacherPass = await bcrypt.hash(`teach${schoolIndex}1`, 10);
            users.push({
                name: `${school.code} Teacher`,
                email: `t1@school${schoolIndex}.com`,
                password: teacherPass,
                role: "teacher",
                schoolId: school.code,
                employeeId: `${school.code}-T01`
            });

            // Student (1 per school for demo)
            const studentPass = await bcrypt.hash(`std${schoolIndex}1`, 10);
            users.push({
                name: `${school.code} Student`,
                email: `s1@school${schoolIndex}.com`,
                password: studentPass,
                role: "student",
                schoolId: school.code,
                enrollmentId: `${school.code}-S01`
            });
        }

        // Save All
        await User.insertMany(users);
        console.log(`🎉 Database Seeded! Created ${users.length} users.`);
        process.exit();

    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

seedDatabase();