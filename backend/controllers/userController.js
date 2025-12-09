const User = require('../models/User');

// Register Teacher (Sirf School Admin kar sakta hai)
const registerTeacher = async (req, res) => {
    try {
        const { name, email, password, schoolId } = req.body;

        // 1. Check karein user pehle se hai ya nahi
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // 2. Naya Teacher Create Karein
        const teacher = await User.create({
            name,
            email,
            password,
            role: 'teacher', // Role set kiya
            schoolId // Ye School Admin ke account se aayega
        });

        res.status(201).json({
            success: true,
            message: "Teacher Added Successfully",
            teacher
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { registerTeacher };