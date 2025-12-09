const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure User model exists

// Token Generator Function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth Super Admin & get token
// @route   POST /api/super-admin/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Temporary Hardcoded Admin Check (Kyuki abhi Database khali hai)
  // Baad mein hum Database se check karenge
  if (email === 'admin@saas.com' && password === 'admin123') {
    res.json({
      _id: 'superadmin123',
      name: 'Super Admin',
      email: email,
      role: 'super-admin',
      token: generateToken('superadmin123'),
    });
  } else {
    // Agar galat password hai
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

module.exports = { authUser };