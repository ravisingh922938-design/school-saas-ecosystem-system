const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/superAdminController');

// Login Route
router.post('/login', authUser);

module.exports = router;