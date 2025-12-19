const Notice = require('../models/Notice');

// 1. Create Notice (Principal karega)
exports.createNotice = async (req, res) => {
  try {
    const { schoolId, title, description, type } = req.body;
    const newNotice = new Notice({ schoolId, title, description, type });
    await newNotice.save();
    res.status(201).json({ success: true, message: "Notice Posted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get Notices (Teacher/Student dekhenge)
exports.getNotices = async (req, res) => {
  try {
    // Sirf usi school ke notice dikhao jis school ki ID aayi hai
    const notices = await Notice.find({ schoolId: req.params.schoolId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};