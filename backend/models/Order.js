const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    schoolId: String,
    schoolName: String, // UI dikhane ke liye
    items: Array, // [{name, qty, price}]
    total: Number,
    status: { type: String, default: 'Pending' }, // Pending -> Shipped
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);