const mongoose = require('mongoose');

const feeRecordSchema = new mongoose.Schema({
  schoolId: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: String,
  classId: String,
  amount: Number,
  mode: String, // Cash, Online
  date: { type: Date, default: Date.now },
  receiptNo: String // e.g. RCP-1001
});

module.exports = mongoose.model('FeeRecord', feeRecordSchema);