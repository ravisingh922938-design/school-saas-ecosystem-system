const express = require('express');
const router = express.Router();
const School = require('../models/School');

// Get School Details by School Code (Public or Protected)
router.get('/details/:schoolId', async (req, res) => {
    try {
        const school = await School.findOne({ schoolId: req.params.schoolId });
        if (!school) return res.status(404).json({ success: false, message: "School not found" });

        res.status(200).json({ success: true, data: school });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;