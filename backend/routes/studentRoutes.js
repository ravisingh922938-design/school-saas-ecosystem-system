const express = require('express');
const router = express.Router();
const { createNotice, getNotices } = require('../controllers/schoolController');

// 👇 Ye routes hone chahiye
router.post('/notice/add', createNotice);
router.get('/notice/:schoolId', getNotices);

module.exports = router;