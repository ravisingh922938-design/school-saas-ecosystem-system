const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['super-admin', 'school', 'teacher', 'student'],
    default: 'student'
  },
  schoolId: {
    type: String,
    default: null
  },
  employeeId: {
    type: String,
    default: null
  },
  enrollmentId: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);