const mongoose = require('mongoose');

const FeeRecordSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Paid', 'Pending', 'Overdue'],
  },
  surcharge: {
    type: Number,
    default: 0,
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'Online', 'Card'],
  },
  adminCommission: {
    type: Number,
    default: 0,
  },
  razorpayOrderId: {
    type: String,
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },
  isSettled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('FeeRecord', FeeRecordSchema);




