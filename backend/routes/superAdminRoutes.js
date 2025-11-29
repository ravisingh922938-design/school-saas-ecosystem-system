const express = require('express');
const router = express.Router();
const { createSchool, getDashboardStats } = require('../controllers/superAdminController');
// const { protect } = require('../middleware/authMiddleware'); // Assuming Super Admin routes will be protected

router.post('/', createSchool); // In a real app, this would be protected by a super admin specific middleware
router.get('/dashboard/stats', getDashboardStats); // Will be protected by protect middleware and super admin role check

module.exports = router;







