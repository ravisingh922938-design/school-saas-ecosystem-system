const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  presentStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  absentStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Attendance', AttendanceSchema);

