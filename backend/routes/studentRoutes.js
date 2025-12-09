const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getStudents, addStudent } = require('../controllers/studentController');

// Protect all routes with authentication
router.use(protect);

// Only school admins can access these routes
router.use(authorize('school_admin'));

// GET /api/students - Get all students with pagination and search
// POST /api/students - Add a new student
router.route('/')
  .get(getStudents)
  .post(addStudent);

module.exports = router;
