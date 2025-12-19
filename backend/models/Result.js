const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: { type: String, required: true }, // e.g. DPS-S01
    examName: { type: String, required: true }, // e.g. Mid-Term
    subjects: [
        { name: String, marks: Number, total: Number }
    ],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);