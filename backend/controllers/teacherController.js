const Teacher = require('../models/Teacher');

// @desc    Add a new Teacher
// @route   POST /api/teachers/add
const addTeacher = async (req, res) => {
    try {
        const { name, email, phone, subject, password } = req.body;

        // Check if email exists
        const teacherExists = await Teacher.findOne({ email });
        if (teacherExists) {
            return res.status(400).json({ message: 'Teacher with this email already exists' });
        }

        // Create Teacher
        const teacher = await Teacher.create({
            name,
            email,
            phone,
            subject,
            password, // Model will auto-hash this
            role: 'teacher'
        });

        res.status(201).json({
            success: true,
            message: "Teacher Added Successfully",
            teacher
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Teachers
// @route   GET /api/teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ role: 'teacher' }).sort({ createdAt: -1 });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTeacher, getTeachers };