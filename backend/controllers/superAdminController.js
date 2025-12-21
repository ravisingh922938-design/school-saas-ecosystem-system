const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const School = require('../models/School');

// Token Generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. SUPER ADMIN LOGIN
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.role !== 'super-admin') {
      res.status(401);
      throw new Error('Not authorized as Super Admin');
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// 2. ADD NEW SCHOOL (Crash-Proof Version 🛡️)
const addSchool = async (req, res) => {
  try {
    console.log("👉 ADD SCHOOL REQUEST STARTED...");

    const {
      schoolName, schoolCode, email, password,
      themeColor, tagline, address
    } = req.body;

    // 1. Check Duplicate
    const existingSchool = await School.findOne({ schoolId: schoolCode });
    if (existingSchool) {
      return res.status(400).json({ success: false, message: "School Code already exists" });
    }

    // 2. LOGO HANDLING (Safe Mode)
    let logoUrl = "https://cdn-icons-png.flaticon.com/512/1046/1046374.png"; // Default

    try {
      if (req.file && req.file.path) {
        logoUrl = req.file.path; // Cloudinary URL
        console.log("✅ Image Uploaded:", logoUrl);
      } else {
        console.log("⚠️ No image file provided, using default logo.");
      }
    } catch (imgError) {
      console.error("❌ Image Upload Failed (Skipping image):", imgError.message);
      // Image fail hone par bhi hum rukenge nahi, default logo use karenge.
    }

    // 3. Create Principal User
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPrincipal = new User({
      name: "Principal",
      email: email,
      password: hashedPassword,
      role: 'school',
      schoolId: schoolCode,
      employeeId: 'ADMIN'
    });

    await newPrincipal.save();
    console.log("✅ Principal User Created");

    // 4. Create School Data
    const newSchool = new School({
      schoolId: schoolCode,
      name: schoolName,
      email: email,
      branding: {
        logo: logoUrl,
        primaryColor: themeColor || "#2563eb",
        secondaryColor: themeColor || "#1e40af",
        tagline: tagline || "Excellence in Education"
      },
      contact: {
        address: address || ""
      }
    });

    await newSchool.save();
    console.log("✅ School Created Successfully");

    res.status(201).json({
      success: true,
      message: "School Created Successfully!",
      data: newSchool
    });

  } catch (error) {
    // ASLI ERROR PRINT KAREIN
    console.error("🔥 CRITICAL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

// 3. GET ALL SCHOOLS
const getAllSchools = asyncHandler(async (req, res) => {
  const schools = await School.find({}).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: schools });
});

module.exports = {
  authUser,
  addSchool,
  getAllSchools
};