const asyncHandler = require('express-async-handler');
// const Razorpay = require('razorpay'); // Moved to paymentController
const FeeRecord = require('../models/FeeRecord');
const School = require('../models/School');
// const crypto = require('crypto'); // Moved to paymentController

// Initialize Razorpay (removed)
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// @desc    Collect fee (Cash/Card)
// @route   POST /api/fees/collect
// @access  Private (School Admin/Teacher)
const collectFee = asyncHandler(async (req, res) => {
  const { studentId, amount, paymentMode, schoolId } = req.body;

  if (!studentId || !amount || !paymentMode || !schoolId) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const school = await School.findById(schoolId);

  if (!school) {
    res.status(404);
    throw new Error('School not found');
  }

  let surcharge = 0;
  if (paymentMode === 'Online') {
    surcharge = school.paymentConfig.surchargeAmount || 20; // Use school's surcharge or default to 20
  }

  const adminCommission = amount * 0.05; // 5% commission

  const feeRecord = await FeeRecord.create({
    studentId,
    schoolId,
    amount,
    surcharge,
    paymentMode,
    status: 'Paid', // Assuming cash/card payments are instantly paid
    adminCommission,
  });

  if (feeRecord) {
    res.status(201).json(feeRecord);
  } else {
    res.status(400);
    throw new Error('Invalid fee record data');
  }
});

// @desc    Create Razorpay order (moved to paymentController)
// @route   POST /api/fees/createOrder
// @access  Private (Student/Parent)
// const createOrder = asyncHandler(async (req, res) => { // Removed
// ... existing createOrder logic ... // Removed
// }); // Removed

// @desc    Verify Razorpay payment (moved to paymentController)
// @route   POST /api/fees/verifyPayment
// @access  Private (Student/Parent - callback from Razorpay)
// const verifyPayment = asyncHandler(async (req, res) => { // Removed
// ... existing verifyPayment logic ... // Removed
// }); // Removed

module.exports = {
  collectFee,
  // createOrder, // Removed
  // verifyPayment, // Removed
};

