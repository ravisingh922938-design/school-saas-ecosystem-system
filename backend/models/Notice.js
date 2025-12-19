const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    schoolId: { type: String, required: true }, // Jaise: 'DPS'
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'General' }, // Urgent/Event
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);