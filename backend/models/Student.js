const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    schoolId: { type: String, required: true },
    name: { type: String, required: true },
    enrollmentId: { type: String, required: true, unique: true }, // Search ke liye
    rollNo: { type: String, required: true },
    class: { type: String, required: true }, // Class Name
    section: { type: String },
    fatherName: String,
    phone: String,

    // Fees ka hisab (Simple structure)
    fees: {
        total: { type: Number, default: 0 },
        paid: { type: Number, default: 0 },
        due: { type: Number, default: 0 } // Ye Frontend me dikh raha hai
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);