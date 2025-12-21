const express = require('express');
const router = express.Router();

// ✅ Controller se teeno functions import karein
const { authUser, getAllSchools, addSchool } = require('../controllers/superAdminController');

// ✅ Cloudinary Upload Import
const upload = require('../utils/cloudinary');

// 1. Login Route
router.post('/login', authUser); // Agar 'authUser' undefined hoga to error aayega

// 2. Get Schools Route
router.get('/schools', getAllSchools);

// 3. Add School Route (With Image)
router.post('/add-school', upload.single('logoFile'), addSchool);

module.exports = router;