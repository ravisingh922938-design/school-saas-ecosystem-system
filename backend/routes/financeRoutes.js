const express = require('express');
const router = express.Router();
const { getAdminDues, settleDues } = require('../controllers/financeController');
// const { protect } = require('../middleware/authMiddleware'); // Assuming these routes will be protected

router.get('/admin-dues', getAdminDues); // Protected by Super Admin role
router.put('/settle-dues', settleDues); // Protected by Super Admin role

module.exports = router;
