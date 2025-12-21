const express = require('express');
const router = express.Router();

// 1. School Controller Import (Ab isme saare functions hain)
const {
    createNotice,
    getNotices,
    addTeacher,
    getTeachers
} = require('../controllers/schoolController');

// 2. Fee Controller Import
const {
    searchStudentForFee,
    collectFee,
    getRecentFees,
    getDefaulters
} = require('../controllers/feeController');


// --- ROUTES ---

// Notices
router.post('/notice/add', createNotice);
router.get('/notice/:schoolId', getNotices);

// Teachers (Ye route ab crash nahi karega)
router.post('/add-teacher', addTeacher);
router.get('/teachers/:schoolId', getTeachers);

// Fees
router.get('/fees/search', searchStudentForFee);
router.post('/fees/collect', collectFee);
router.get('/fees/recent/:schoolId', getRecentFees);
router.get('/fees/defaulters/:schoolId', getDefaulters);

module.exports = router;