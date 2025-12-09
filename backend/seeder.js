const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Check karein aapka User model yahi hai na?

dotenv.config();

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding...'))
    .catch(err => console.log(err));

const importData = async () => {
    try {
        // 1. Purana data saaf karein (Optional, taaki duplicate na ho)
        await User.deleteMany();

        // 2. Passwords Hash karein
        const salt = await bcrypt.genSalt(10);
        const adminPass = await bcrypt.hash('admin123', salt);
        const schoolPass = await bcrypt.hash('school123', salt);
        const teacherPass = await bcrypt.hash('teach123', salt);
        const studentPass = await bcrypt.hash('student123', salt);

        // 3. Users Create Karein
        const users = [
            {
                name: "Super Admin",
                email: "admin@saas.com",
                password: adminPass,
                role: "super-admin"
            },
            {
                name: "Principal Sir",
                email: "principal@school.com",
                password: schoolPass,
                role: "school"
            },
            {
                name: "Rahul Teacher",
                email: "T-2025-001", // Teacher ID as Email logic
                password: teacherPass,
                role: "teacher"
            },
            {
                name: "Arav Student",
                email: "STD-2025-101", // Student Enrollment as Email logic
                password: studentPass,
                role: "student"
            }
        ];

        // 4. Database mein Insert karein
        await User.insertMany(users);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();