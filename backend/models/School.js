const mongoose = require('mongoose');

const SchoolSchema = mongoose.Schema({
  instituteCode: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  institutionType: {
    type: String,
    required: true,
    enum: ['School', 'Coaching'],
  },
  paymentConfig: {
    surchargeAmount: {
      type: Number,
      default: 0,
    },
  },
  features: {
    transport: {
      type: Boolean,
      default: false,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    // Add other features as needed
  },
  smsBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('School', SchoolSchema);











