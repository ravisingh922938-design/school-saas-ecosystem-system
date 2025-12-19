const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// 1. Upload Marks (Teacher)
router.post('/add', async (req, res) => {
    try {
        // Check if result already exists for this exam/student
        let existingResult = await Result.findOne({
            studentId: req.body.studentId,
            examName: req.body.examName
        });

        if (existingResult) {
            existingResult.subjects = req.body.subjects; // Update
            await existingResult.save();
        } else {
            const newResult = new Result(req.body); // Create New
            await newResult.save();
        }
        res.json({ success: true, message: "Marks Saved!" });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// 2. Get Result (Student)
router.get('/:studentId', async (req, res) => {
    try {
        // Sabse latest exam pehle dikhao
        const results = await Result.find({ studentId: req.params.studentId }).sort({ date: -1 });
        res.json({ success: true, data: results });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;