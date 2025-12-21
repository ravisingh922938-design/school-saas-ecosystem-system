const express = require('express');
const router = express.Router();
const { getAllSchools, addSchool } = require('../controllers/superAdminController');
const upload = require('../utils/cloudinary'); // Import Cloudinary Config

router.get('/schools', getAllSchools);

// 👇 'logoFile' wahi naam hai jo frontend se aayega
router.post('/add-school', upload.single('logoFile'), addSchool);

module.exports = router;