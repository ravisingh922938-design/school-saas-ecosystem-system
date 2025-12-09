const express = require('express');
const router = express.Router();

// 1. Controller Import Karein (Dhyan dein path sahi ho)
const { createSchool, loginSchool, getSchools } = require('../controllers/schoolController');

// 2. Routes Define Karein
// Check karein ki 'createSchool' function undefined na ho
router.post('/register', createSchool);
router.post('/login', loginSchool);
router.get('/', getSchools);

module.exports = router;