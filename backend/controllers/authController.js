const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    console.log("👉 LOGIN HIT:", req.body); // Debug Log

    const { role, identifier, password } = req.body;

    if (!identifier || !password || !role) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Search by Email OR EmployeeID OR EnrollmentID
    const user = await User.findOne({
      role: role,
      $or: [
        { email: identifier },
        { employeeId: identifier },
        { enrollmentId: identifier }
      ]
    });

    if (!user) {
      console.log("❌ User query failed for:", identifier);
      return res.status(404).json({ success: false, message: "User not found in Database" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password wrong for:", user.email);
      return res.status(401).json({ success: false, message: "Wrong Password" });
    }

    // Token Logic with 1 day expiration
    const token = jwt.sign(
      { id: user._id, role: user.role, schoolId: user.schoolId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("✅ Login successful for:", user.email);
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId
      }
    });

  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};