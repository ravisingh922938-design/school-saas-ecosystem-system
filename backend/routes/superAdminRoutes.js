const express = require('express');
const router = express.Router();
const { authUser, getAllSchools, addSchool } = require('../controllers/superAdminController');

// 👇 Cloudinary Upload Utility Import karein
const upload = require('../utils/cloudinary');

// 1. Super Admin Login
router.post('/login', authUser);

// 2. Get All Schools
router.get('/schools', getAllSchools);

// 3. Add School (With Image Upload Middleware)
// 'logoFile' wahi naam hai jo Frontend se FormData me aayega
router.post('/add-school', upload.single('logoFile'), addSchool);

module.exports = router;