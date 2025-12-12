const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { role, identifier, password } = req.body;

    // 🕵️‍♂️ JAASOOS LOG 1: Dekhte hain Frontend se kya aaya
    console.log("👉 Login Attempt:", { role, identifier, password });

    if (!identifier || !password || !role) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    // User find karo
    const user = await User.findOne({
      role: role,
      $or: [
        { email: identifier },
        { employeeId: identifier },
        { enrollmentId: identifier }
      ]
    });

    // 🕵️‍♂️ JAASOOS LOG 2: Kya User Database me mila?
    if (!user) {
      console.log("❌ User Not Found in DB");
      return res.status(401).json({ success: false, message: "User not found" });
    }
    console.log("✅ User Found:", user.email);

    // Password Check
    const isMatch = await bcrypt.compare(password, user.password);

    // 🕵️‍♂️ JAASOOS LOG 3: Password match hua?
    if (!isMatch) {
      console.log("❌ Password Mismatch");
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // Token Generate
    const token = jwt.sign(
      { id: user._id, role: user.role, schoolId: user.schoolId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("🎉 Login Successful!");

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
    console.error("🔥 Server Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};