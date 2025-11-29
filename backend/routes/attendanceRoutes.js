const express = require('express');
const router = express.Router();
const { saveAttendance } = require('../controllers/attendanceController');
// const { protect } = require('../middleware/authMiddleware'); // Assuming these routes will be protected

router.post('/', saveAttendance); // Protected by teacher role

module.exports = router;

