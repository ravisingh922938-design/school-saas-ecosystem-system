const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// 1. Mark Attendance (Teacher)
router.post('/mark', async (req, res) => {
    try {
        const { schoolId, date, classId, records } = req.body;

        // Check if attendance already marked for this date/class
        let attendance = await Attendance.findOne({ schoolId, date, classId });

        if (attendance) {
            // Update existing
            attendance.records = records;
            await attendance.save();
        } else {
            // Create new
            attendance = new Attendance({ schoolId, date, classId, records });
            await attendance.save();
        }

        res.status(200).json({ success: true, message: "Attendance Saved!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Get Attendance (For Graph/Student)
router.get('/:schoolId/:studentId', async (req, res) => {
    try {
        const { schoolId, studentId } = req.params;
        // Find all records where this student exists
        const logs = await Attendance.find({ schoolId, "records.studentId": studentId });

        // Calculate Logic (Kitne din present tha)
        const stats = logs.map(log => {
            const studentRecord = log.records.find(r => r.studentId === studentId);
            return { date: log.date, status: studentRecord.status };
        });

        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;