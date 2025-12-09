const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },

    // Naya Enrollment ID Field
    enrollmentId: {
        type: String,
        unique: true,
        required: true
    },

    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },

    class: { type: String },
    rollNo: { type: String },
    fatherName: { type: String },
    phone: { type: String },

    password: { type: String, default: 'student123' }, // Default password

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);