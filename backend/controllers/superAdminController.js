const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const School = require('../models/School');

// --- HELPER: Token Generator ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ==========================================
// 1. SUPER ADMIN LOGIN
// ==========================================
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

// ==========================================
// 2. ADD NEW SCHOOL (With File Upload Logic)
// ==========================================
const addSchool = asyncHandler(async (req, res) => {
  const {
    schoolName, schoolCode, email, password,
    themeColor, tagline, address
  } = req.body;

  // 1. Check karo School Code pehle se hai ya nahi
  const existingSchool = await School.findOne({ schoolId: schoolCode });
  if (existingSchool) {
    res.status(400);
    throw new Error("School Code already exists");
  }

  // 2. LOGO HANDLING (Magic Here ✨)
  // Agar Cloudinary ne file upload ki hai, to uska URL lo.
  // Nahi to ek default logo laga do.
  let logoUrl = "https://cdn-icons-png.flaticon.com/512/1046/1046374.png";

  if (req.file && req.file.path) {
    logoUrl = req.file.path; // ✅ Secure Cloudinary URL
  }

  // 3. Principal User Create karo
  const hashedPassword = await bcrypt.hash(password, 10);
  const newPrincipal = new User({
    name: "Principal",
    email: email,
    password: hashedPassword,
    role: 'school',
    schoolId: schoolCode
  });
  await newPrincipal.save();

  // 4. School Branding Create karo
  const newSchool = new School({
    schoolId: schoolCode,
    name: schoolName,
    email: email,
    branding: {
      logo: logoUrl, // ✅ Yahan Secure Logo Save hoga
      primaryColor: themeColor || "#2563eb",
      secondaryColor: themeColor || "#1e40af",
      tagline: tagline || "Excellence in Education"
    },
    contact: {
      address: address || ""
    }
  });
  await newSchool.save();

  res.status(201).json({
    success: true,
    message: "School & App Created Successfully!",
    data: newSchool
  });
});

// ==========================================
// 3. GET ALL SCHOOLS
// ==========================================
const getAllSchools = asyncHandler(async (req, res) => {
  const schools = await School.find({});
  res.status(200).json({ success: true, data: schools });
});

module.exports = {
  authUser,
  addSchool,
  getAllSchools
};