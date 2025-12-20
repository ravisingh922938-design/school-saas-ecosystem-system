const Material = require('../models/Material');

// 1. Upload Material (Teacher)
exports.uploadMaterial = async (req, res) => {
    try {
        const { title, description, type, subject, classId, teacherName } = req.body;

        // Cloudinary se file URL nikalo
        let fileUrl = "";
        if (req.file && req.file.path) {
            fileUrl = req.file.path;
        } else {
            return res.status(400).json({ success: false, message: "File upload failed" });
        }

        const newMaterial = new Material({
            title, description, type, subject, classId, teacherName, fileUrl
        });

        await newMaterial.save();
        res.status(201).json({ success: true, message: "Upload Successful!", data: newMaterial });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Get Materials (Student)
exports.getMaterials = async (req, res) => {
    try {
        const { type } = req.query; // ?type=video or ?type=pdf
        const materials = await Material.find({ type }).sort({ date: -1 });
        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};