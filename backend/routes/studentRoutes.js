const express = require('express');
const router = express.Router();
const { createNotice, getNotices } = require('../controllers/schoolController');
const { addStudent, getStudentsByClass } = require('../controllers/studentController');

// 👇 Ye routes hone chahiye
router.post('/notice/add', createNotice);
router.get('/notice/:schoolId', getNotices);
router.post('/add', addStudent); // Admission ke liye
router.get('/list', getStudentsByClass); // Attendance list ke liye

module.exports = router;