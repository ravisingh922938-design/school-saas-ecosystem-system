const express = require('express');
const router = express.Router();
const { addStudent } = require('../controllers/studentController');
const { collectFee } = require('../controllers/feeController');
// const { protect } = require('../middleware/authMiddleware'); // Assuming these routes will be protected

router.post('/student/add', addStudent); // Will be protected by protect middleware
router.post('/fee/collect', collectFee); // Will be protected by protect middleware
// router.post('/fee/createOrder', createOrder); // Removed
// router.post('/fee/verifyPayment', verifyPayment); // Removed

module.exports = router;

