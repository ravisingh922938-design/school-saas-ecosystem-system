const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    schoolId: { type: String, required: true }, // e.g. DPS
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    classId: { type: String, required: true }, // e.g. 10
    section: { type: String, required: true }, // e.g. A
    fatherName: String,
    phone: String,
    admissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);