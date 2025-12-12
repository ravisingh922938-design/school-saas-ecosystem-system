const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // 1. Frontend se data lo (Frontend sends 'identifier', not just 'email')
    const { role, identifier, password } = req.body;

    // 2. Validation
    if (!identifier || !password || !role) {
      return res.status(400).json({ success: false, message: "Please provide ID, Password and Role" });
    }

    // 3. User ko dhoondo (Email ya ID check karo based on role)
    // Hum check karenge ki kya 'identifier' email match karta hai YA phir employeeId/enrollmentId
    const user = await User.findOne({
      role: role, // Role match hona zaruri hai
      $or: [
        { email: identifier },
        { employeeId: identifier },
        { enrollmentId: identifier }
      ]
    });

    // 4. Agar user nahi mila
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found with this Role & ID" });
    }

    // 5. Password Check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // 6. Token banao
    const token = jwt.sign(
      { id: user._id, role: user.role, schoolId: user.schoolId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 7. Success Response bhejo
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
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};