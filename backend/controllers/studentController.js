const Student = require('../models/Student');

// 1. ADD STUDENT (Admission)
exports.addStudent = async (req, res) => {
  try {
    const { schoolId, name, rollNo, classId, section, fatherName, phone } = req.body;

    if (!schoolId || !name || !rollNo || !classId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existingStudent = await Student.findOne({ schoolId, classId, section, rollNo });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Roll No already exists" });
    }

    const newStudent = new Student(req.body);
    await newStudent.save();

    res.status(201).json({ success: true, message: "Student Admitted Successfully!", data: newStudent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. GET ALL STUDENTS (Renamed to match Route)
exports.getAllStudents = async (req, res) => {
  try {
    const { schoolId } = req.query;
    if (!schoolId) return res.status(400).json({ message: "School ID required" });

    const students = await Student.find({ schoolId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. GET STUDENTS BY CLASS
exports.getStudentsByClass = async (req, res) => {
  try {
    const { schoolId, classId, section } = req.query;
    const students = await Student.find({ schoolId, classId, section });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. DUMMY FUNCTIONS (Taaki App Crash na ho)
exports.getStudentProfile = async (req, res) => res.json({ success: true, message: "Profile API" });
exports.getStudentFees = async (req, res) => res.json({ success: true, message: "Fees API" });
exports.getStudentHomework = async (req, res) => res.json({ success: true, message: "Homework API" });
exports.getStudentResults = async (req, res) => res.json({ success: true, message: "Results API" });