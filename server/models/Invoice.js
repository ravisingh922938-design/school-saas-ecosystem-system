const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setDate(date.getDate() + 15); // 15 days from now
      return date;
    }
  },
  paymentDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
InvoiceSchema.index({ tenant: 1, status: 1 });
InvoiceSchema.index({ date: 1 });

module.exports = mongoose.model('Invoice', InvoiceSchema);
