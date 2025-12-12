const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // 1. Get data from request body
    const { role, identifier, password } = req.body;

    // 2. Input validation
    if (!identifier || !password || !role) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields: identifier, password, and role" 
      });
    }

    // 3. Normalize the identifier (trim and lowercase for email)
    const normalizedIdentifier = identifier.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedIdentifier);
    
    // 4. Build the query based on identifier type
    const query = { role };
    
    if (isEmail) {
      query.email = normalizedIdentifier.toLowerCase();
    } else {
      // For non-email identifiers, check both employeeId and enrollmentId
      query.$or = [
        { employeeId: normalizedIdentifier },
        { enrollmentId: normalizedIdentifier }
      ];
    }

    // 5. Find the user
    const user = await User.findOne(query).select('+password');
    
    // 6. Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials. Please check your role and identifier." 
      });
    }

    // 7. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password" 
      });
    }

    // 8. Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        schoolId: user.schoolId,
        email: user.email
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.JWT_EXPIRES_IN || '1d' 
      }
    );

    // 9. Remove sensitive data before sending response
    user.password = undefined;

    // 10. Send success response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
        employeeId: user.employeeId,
        enrollmentId: user.enrollmentId
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred during login. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};