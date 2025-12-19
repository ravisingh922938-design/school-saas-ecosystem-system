const Notice = require('../models/Notice');
const Student = require('../models/Student'); // Is line ko check karein

// 1. Create Notice (Principal karega)
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

// 2. Get Notices (Teacher/Student dekhenge)
exports.getNotices = async (req, res) => {
  try {
    // Sirf usi school ke notice dikhao jis school ki ID aayi hai
    const notices = await Notice.find({ schoolId: req.params.schoolId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// 1. Add Student (Admission)
exports.addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ success: true, message: "Student Admitted Successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get Students by Class (For Teacher Attendance)
exports.getStudentsByClass = async (req, res) => {
  try {
    const { schoolId, classId, section } = req.query;
    const students = await Student.find({ schoolId, classId, section });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};