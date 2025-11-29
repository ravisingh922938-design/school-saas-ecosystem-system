const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const School = require('../models/School');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Verify institute code
// @route   GET /api/auth/verifyInstituteCode
// @access  Public
const verifyInstituteCode = asyncHandler(async (req, res) => {
  const { instituteCode } = req.body;

  const school = await School.findOne({ instituteCode });

  if (school) {
    res.json({
      schoolName: school.instituteCode, // Assuming instituteCode can also be used as a name or a separate name field can be added
      logo: 'URL_TO_SCHOOL_LOGO', // Placeholder for logo URL
    });
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password, instituteCode } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Check if the user belongs to the correct schoolId
    const school = await School.findOne({ instituteCode });

    if (school && user.schoolId.toString() === school._id.toString()) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid credentials or school');
    }
  }

  else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

module.exports = {
  verifyInstituteCode,
  login,
};











