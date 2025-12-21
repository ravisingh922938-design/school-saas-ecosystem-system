const Notice = require('../models/Notice');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- A. NOTICE BOARD LOGIC ---

// 1. Create Notice
exports.createNotice = async (req, res) => {
    try {
        const { schoolId, title, description, type } = req.body;
        const newNotice = new Notice({ schoolId, title, description, type });
        await newNotice.save();
        res.status(201).json({ success: true, message: "Notice Posted!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Get Notices
exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find({ schoolId: req.params.schoolId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: notices });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// --- B. TEACHER/STAFF LOGIC (Ye missing tha isliye error aya) ---

// 3. Add Teacher
exports.addTeacher = async (req, res) => {
    try {
        const { name, email, employeeId, password, schoolId } = req.body;

        // Check if teacher exists
        const existingUser = await User.findOne({ $or: [{ email }, { employeeId }] });
        if (existingUser) return res.status(400).json({ success: false, message: "Teacher already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new User({
            name,
            email,
            password: hashedPassword,
            role: 'teacher',
            schoolId,
            employeeId
        });

        await newTeacher.save();
        res.json({ success: true, message: "Teacher Added Successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get Teachers List
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ schoolId: req.params.schoolId, role: 'teacher' }).select('-password');
        res.json({ success: true, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};