const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    schoolId: { type: String, required: true },
    title: { type: String, required: true },
    chapter: { type: String },
    type: { type: String, enum: ['class', 'material'], required: true },
    videoUrl: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    thumbnail: { type: String, default: "https://via.placeholder.com/150" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', materialSchema);