const express = require('express');
const router = express.Router();
const { addTeacher, getTeachers } = require('../controllers/teacherController');

router.post('/add', addTeacher);
router.get('/', getTeachers);

module.exports = router;