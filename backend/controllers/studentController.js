const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const School = require('../models/School');
const FeeRecord = require('../models/FeeRecord');

// @desc    Add a new student
// @route   POST /api/students
// @access  Private (School Admin/Teacher)
const addStudent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    parentPhone,
    gender,
    schoolId
  } = req.body;

  if (!name || !email || !password || !schoolId) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  // Check if user already exists
  const userExists = await User.findOne({
    email,
    schoolId
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists in this school');
  }

  // Find the school to get its instituteCode
  const school = await School.findById(schoolId);

  if (!school) {
    res.status(404);
    throw new Error('School not found');
  }

  // Generate Roll No
  const lastStudent = await User.findOne({
    schoolId,
    role: 'Student'
  }).sort({
    _id: -1
  }); // Get the last student by creation order

  let rollNo;
  const currentYear = new Date().getFullYear();
  const instituteCodePrefix = school.instituteCode.toUpperCase();

  if (lastStudent && lastStudent.rollNo) {
    const lastRollNo = lastStudent.rollNo;
    const parts = lastRollNo.split('-'); // e.g., ['DPS', '2025', '001']
    const lastSequence = parseInt(parts[2]);
    const newSequence = (lastSequence + 1).toString().padStart(3, '0');
    rollNo = `${instituteCodePrefix}-${currentYear}-${newSequence}`;
  } else {
    rollNo = `${instituteCodePrefix}-${currentYear}-001`;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const student = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'Student',
    schoolId,
    parentPhone,
    gender,
    rollNo,
  });

  if (student) {
    // Create initial FeeRecord (Admission Fee)
    await FeeRecord.create({
      studentId: student._id,
      schoolId: student.schoolId,
      amount: 1000, // Admission fee - can be dynamic
      status: 'Pending', // Initial status
      paymentMode: 'Cash', // Default payment mode
    });

    res.status(201).json({
      _id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
      schoolId: student.schoolId,
      rollNo: student.rollNo,
    });
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

module.exports = {
  addStudent,
};







