const jwt = require('jsonwebtoken');
const Tenant = require('../models/Tenant');
const User = require('../models/User');

const login = async (req, res) => {
  const { role, identifier, password } = req.body;

  try {
    let user = null;

    // ===================================================
    // 🛠️ HARDCODED DEMO CREDENTIALS (Testing ke liye)
    // ===================================================

    // 1. Super Admin Demo
    if (role === 'super-admin' && identifier === 'admin@saas.com' && password === 'admin123') {
      user = { _id: '1', name: 'Super Admin', role: 'super-admin' };
    }

    // 2. School Principal Demo
    else if (role === 'school' && identifier === 'principal@school.com' && password === 'school123') {
      user = { _id: '2', name: 'Galaxy School Principal', role: 'school' };
    }

    // 3. Teacher Demo
    else if (role === 'teacher' && identifier === 'T-2025-001' && password === 'teach123') {
      user = { _id: '3', name: 'Rahul Sir', role: 'teacher' };
    }

    // 4. Student Demo
    // Note: Yahan hum naya Enrollment ID format check kar rahe hain
    else if (role === 'student' && (identifier === 'DPS-2025-0001' || identifier === 'STD-2025-101') && password === 'student123') {
      user = { _id: '4', name: 'Arav Sharma', role: 'student' };
    }

    // ===================================================
    // 🗄️ REAL DATABASE CHECK (Agar Demo nahi hai to DB check karo)
    // ===================================================

    if (!user) {
      if (role === 'school') {
        const tenant = await Tenant.findOne({ email: identifier });
        if (tenant && tenant.password === password) {
          user = tenant;
        }
      }
      // Future mein yahan Student/Teacher DB logic aayega
    }

    // --- FINAL RESULT ---
    if (!user) {
      return res.status(401).json({ success: false, message: '❌ User not found or Wrong Password' });
    }

    // Token Generate
    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user,
      message: 'Login Successful'
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { login };