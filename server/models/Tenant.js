const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['School', 'Coaching', 'College'],
        required: true,
    },
    studentCount: {
        type: Number,
        default: 0,
    },
    revenueModel: {
        type: String,
        enum: ['Subscription', 'Commission'],
        required: true,
    },
    commercials: {
        platformFee: {
            type: Number,
            required: true,
        },
        admissionFee: {
            type: Number,
            required: true,
        },
    },
    features: {
        transport: {
            type: Boolean,
            default: false,
        },
        library: {
            type: Boolean,
            default: false,
        },
        hostel: {
            type: Boolean,
            default: false,
        },
        sms: {
            type: Boolean,
            default: false,
        },
    },
    status: {
        type: String,
        default: 'Active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastPaymentDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Tenant', TenantSchema);
