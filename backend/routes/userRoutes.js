const express = require('express');
const router = express.Router();
const { registerTeacher } = require('../controllers/userController');

// POST Request: /api/users/add-teacher
router.post('/add-teacher', registerTeacher);

module.exports = router;