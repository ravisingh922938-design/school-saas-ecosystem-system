const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  schoolId: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  classId: { type: String, required: true }, // e.g., "10-A"
  records: [
    {
      studentId: String,
      studentName: String,
      status: String // "Present" or "Absent"
    }
  ]
});

module.exports = mongoose.model('Attendance', attendanceSchema);