const User = require('../models/User');
const School = require('../models/School'); // ✅ School Model Import kiya
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    console.log("👉 LOGIN HIT:", req.body); // Debug Log

    const { role, identifier, password } = req.body;

    // 1. Validation
    if (!identifier || !password || !role) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // 2. Search User (By Email OR EmployeeID OR EnrollmentID)
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
      // Security ke liye 401 use karein
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // 3. Password Check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password wrong for:", user.email);
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // 4. ✨ MAGIC: Fetch School Branding (Agar user kisi school ka hai)
    let brandingData = null;
    if (user.schoolId) {
      // School table se Logo aur Color nikalo
      const school = await School.findOne({ schoolId: user.schoolId });
      if (school && school.branding) {
        brandingData = school.branding;
      }
    }

    // 5. Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role, schoolId: user.schoolId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("✅ Login successful for:", user.email);

    // 6. Send Response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId
      },
      branding: brandingData // ✅ Frontend ye data lekar color change karega
    });

  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};