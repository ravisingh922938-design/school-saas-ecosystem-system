const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    schoolCode: {
        type: String,
        unique: true,
        uppercase: true, // Auto convert to uppercase
        required: false // Abhi false rakhte hain taaki purane data pe error na aaye
    },
    type: {
        type: String,
        enum: ['School', 'Coaching', 'College'],
        default: 'School'
    },
    status: {
        type: String,
        enum: ['Active', 'Blocked'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tenant', tenantSchema);