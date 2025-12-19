const express = require('express');
const router = express.Router();
const { createNotice, getNotices } = require('../controllers/schoolController');

// Route: /api/school-data/notice/add
router.post('/notice/add', createNotice);

// Route: /api/school-data/notice/:schoolId
router.get('/notice/:schoolId', getNotices);

module.exports = router;