const Notice = require('../models/Notice');

// 1. Create Notice
exports.createNotice = async (req, res) => {
    try {
        const { schoolId, title, description, type } = req.body;

        const newNotice = new Notice({
            schoolId,
            title,
            description,
            type
        });

        await newNotice.save();
        res.status(201).json({ success: true, message: "Notice Added!" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get Notices
exports.getNotices = async (req, res) => {
    try {
        const { schoolId } = req.params;
        // Newest notice first (sort -1)
        const notices = await Notice.find({ schoolId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: notices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};