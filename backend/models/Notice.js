const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    schoolId: { type: String, required: true }, // Kis school ka notice hai
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, default: 'General' } // Urgent / General
});

module.exports = mongoose.model('Notice', noticeSchema);