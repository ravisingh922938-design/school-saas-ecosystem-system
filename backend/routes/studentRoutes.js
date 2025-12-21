const express = require('express');
const router = express.Router();

// Controller se functions import karein
const {
    addStudent,
    getAllStudents,
    getStudentsByClass,
    getStudentProfile,
    getStudentFees,
    getStudentHomework,
    getStudentResults
} = require('../controllers/studentController');

// --- ROUTES DEFINITION ---

// 1. Admission (Add Student)
router.post('/add', addStudent);

// 2. Get All Students (Principal List)
router.get('/all', getAllStudents);

// 3. Class Wise List (Teacher Attendance)
router.get('/list', getStudentsByClass);

// 4. Student App Routes (Mobile App - Dummy)
router.get('/profile', getStudentProfile);
router.get('/fees', getStudentFees);
router.get('/homework', getStudentHomework);
router.get('/results', getStudentResults);

module.exports = router;