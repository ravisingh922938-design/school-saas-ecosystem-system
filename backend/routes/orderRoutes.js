const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateStatus } = require('../controllers/orderController');

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.post('/update-status', updateStatus);

module.exports = router;