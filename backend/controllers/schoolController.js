const School = require('../models/School');
const User = require('../models/User'); // ✅ User Model Import kiya

// 1. Create New School & Admin User
const createSchool = async (req, res) => {
    try {
        const { name, email, address, phone } = req.body;

        // Check if school already exists
        const schoolExists = await School.findOne({ email });
        if (schoolExists) {
            return res.status(400).json({ success: false, message: 'School email already exists' });
        }

        // A. School Data Save karein
        const school = await School.create({
            name, email, address, phone
        });

        // B. Automatically User (Principal) Create karein
        // Password filhal default 'school123' rakh rahe hain
        const user = await User.create({
            name: 'Principal',
            email: email, // School email hi login email banegi
            password: 'school123',
            role: 'school',
            schoolId: school._id // User ko School se link kiya
        });

        res.status(201).json({
            success: true,
            message: "School & Admin Account Created!",
            school,
            user
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get All Schools
const getSchools = async (req, res) => {
    try {
        const schools = await School.find({});
        res.status(200).json({ success: true, count: schools.length, data: schools });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const loginSchool = async (req, res) => {
    res.json({ msg: "School Login" });
};

module.exports = { createSchool, getSchools, loginSchool };