const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const Material = require('../models/Material');

const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);

// 1. Upload Route
router.post('/upload', cpUpload, async (req, res) => {
    try {
        const { schoolId, title, chapter, type } = req.body;

        if (!req.files || !req.files['file']) {
            return res.status(400).json({ error: "File select karna zaruri hai" });
        }

        const fileUrl = req.files['file'][0].path;
        const thumbUrl = req.files['thumbnail'] ? req.files['thumbnail'][0].path : "";

        const newEntry = new Material({
            schoolId: schoolId || "DEMO_SCHOOL",
            title,
            chapter,
            type,
            videoUrl: type === 'class' ? fileUrl : "",
            pdfUrl: type === 'material' ? fileUrl : "",
            thumbnail: thumbUrl
        });

        await newEntry.save();
        res.status(201).json({ success: true, message: "Uploaded successfully!" });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// 2. Fetch Route (SaaS filtering ke sath)
router.get('/list/:schoolId', async (req, res) => {
    try {
        const data = await Material.find({ schoolId: req.params.schoolId }).sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;