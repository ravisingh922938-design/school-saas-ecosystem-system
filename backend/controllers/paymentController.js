const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const FeeRecord = require('../models/FeeRecord');
const School = require('../models/School');
const crypto = require('crypto');

// Initialize Razorpay
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/createOrder
// @access  Private (Student/Parent)
const createOrder = asyncHandler(async (req, res) => {
  const { amount, studentId, schoolId } = req.body;

  if (!amount || !studentId || !schoolId) {
    res.status(400);
    throw new Error('Please provide amount, studentId, and schoolId');
  }

  const school = await School.findById(schoolId);
  if (!school) {
    res.status(404);
    throw new Error('School not found');
  }

  // Updated surcharge to 30 as per the latest instruction
  const surchargeAmount = 30;
  const totalAmount = amount + surchargeAmount;

  const options = {
    amount: totalAmount * 100, // amount in smallest currency unit (paise)
    currency: 'INR',
    receipt: `receipt_order_${studentId}_${Date.now()}`,
    payment_capture: 1, // auto capture
  };

  try {
    const order = await razorpayInstance.orders.create(options);

    // Create a fee record with pending status and razorpay order details
    const feeRecord = await FeeRecord.create({
      studentId,
      schoolId,
      amount,
      surcharge: surchargeAmount,
      paymentMode: 'Online',
      status: 'Pending',
      razorpayOrderId: order.id,
    });

    res.status(201).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      feeRecordId: feeRecord._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error('Failed to create Razorpay order');
  }
});

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verifyPayment
// @access  Private (Student/Parent - callback from Razorpay)
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    feeRecordId,
  } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const feeRecord = await FeeRecord.findById(feeRecordId);

    if (!feeRecord) {
      res.status(404);
      throw new Error('Fee record not found');
    }

    const adminCommission = feeRecord.amount * 0.05;

    feeRecord.status = 'Paid';
    feeRecord.razorpayPaymentId = razorpay_payment_id;
    feeRecord.razorpaySignature = razorpay_signature;
    feeRecord.adminCommission = adminCommission;

    await feeRecord.save();

    res.json({
      message: 'Payment verified successfully',
      feeRecord,
    });
  } else {
    res.status(400);
    throw new Error('Invalid signature, payment verification failed');
  }
});

module.exports = {
  createOrder,
  verifyPayment,
};






