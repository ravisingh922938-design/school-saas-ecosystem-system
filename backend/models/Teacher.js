const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'teacher'
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the School Admin
        required: false
    }
}, { timestamps: true });

// Password Match Method
teacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Password Hash before Save
teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Teacher', teacherSchema);