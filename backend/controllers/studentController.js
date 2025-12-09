const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');

// @desc    Get Students with Pagination & Search
// @route   GET /api/school/students?page=1&limit=20&search=arav
const getStudents = asyncHandler(async (req, res) => {
  const { schoolId } = req.user; // Admin token se school ID nikala

  // 1. Pagination Config
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20; // Default 20 records
  const skip = (page - 1) * limit;
  const searchQuery = req.query.search;

  // 2. Build Query
  let query = { schoolId };

  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: 'i' } }, // Case insensitive search
      { rollNo: { $regex: searchQuery, $options: 'i' } }
    ];
  }

  // 3. Execute Query (Use .lean() for Performance)
  // .lean() Mongoose ke heavy objects ko plain JSON mein badal deta hai. (5x Faster)
  const students = await Student.find(query)
    .select('name rollNo class section fees') // Sirf zaruri fields lo
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // 4. Total Count (For Frontend Pagination UI)
  const total = await Student.countDocuments(query);

  res.json({
    success: true,
    count: students.length,
    totalStudents: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: students
  });
});

// @desc    Add a new student with auto-generated enrollment ID
// @route   POST /api/school/students
const addStudent = asyncHandler(async (req, res) => {
  const { schoolId } = req.user;
  const { name, rollNo, email, class: className, section } = req.body;

  try {
    // 1. Get school to get schoolCode
    const School = require('../models/School');
    const school = await School.findById(schoolId);
    
    if (!school) {
      res.status(404);
      throw new Error('School not found');
    }

    // 2. Generate enrollment ID
    const currentYear = new Date().getFullYear();
    
    // Find the latest student for this school to get the next sequence number
    const latestStudent = await Student.findOne({ schoolId })
      .sort({ createdAt: -1 })
      .select('enrollmentId');
    
    let sequenceNumber = 1;
    if (latestStudent && latestStudent.enrollmentId) {
      const lastSequence = parseInt(latestStudent.enrollmentId.split('-').pop());
      if (!isNaN(lastSequence)) {
        sequenceNumber = lastSequence + 1;
      }
    }

    const enrollmentId = `${school.schoolCode}-${currentYear}-${sequenceNumber.toString().padStart(4, '0')}`;

    // 3. Create student
    const student = await Student.create({
      schoolId,
      name,
      rollNo,
      email,
      class: className,
      section,
      enrollmentId,
      fees: {
        total: 0,
        paid: 0,
        due: 0
      }
    });

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      throw new Error('Student with this roll number or email already exists');
    }
    throw error;
  }
});

module.exports = { getStudents, addStudent };