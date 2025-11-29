const asyncHandler = require('express-async-handler');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { sendAttendanceAlert } = require('../utils/smsSender');

// @desc    Save attendance for a class/section
// @route   POST /api/attendance
// @access  Private (Teacher)
const saveAttendance = asyncHandler(async (req, res) => {
  const { schoolId, date, class: className, section, presentStudents, absentStudents } = req.body;

  if (!schoolId || !date || !className || !presentStudents || !absentStudents) {
    res.status(400);
    throw new Error('Please provide all required fields: schoolId, date, class, presentStudents, absentStudents');
  }

  const attendance = await Attendance.create({
    schoolId,
    date,
    class: className,
    section,
    presentStudents,
    absentStudents,
  });

  // Loop through absent students and send SMS
  if (absentStudents.length > 0) {
    const absentStudentDetails = await User.find({
      _id: {
        $in: absentStudents
      }
    }).select('name gender parentPhone');

    for (const student of absentStudentDetails) {
      if (student.parentPhone) {
        sendAttendanceAlert(student, 'Absent');
      }
    }
  }

  if (attendance) {
    res.status(201).json(attendance);
  } else {
    res.status(400);
    throw new Error('Invalid attendance data');
  }
});

module.exports = {
  saveAttendance,
};

