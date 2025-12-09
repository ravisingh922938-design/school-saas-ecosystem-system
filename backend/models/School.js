const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
  name: { type: String, required: true },
  schoolCode: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true,
    minlength: 2,
    maxlength: 5,
    match: [/^[A-Z0-9]+$/, 'School code must be alphanumeric and uppercase']
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  status: { type: String, default: 'Active' },
  subscriptionPlan: { type: String, default: 'Basic' }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);