const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const School = require('../models/School');
const User = require('../models/User'); // Import User model
const FeeRecord = require('../models/FeeRecord'); // Import FeeRecord model

// @desc    Create new school
// @route   POST /api/superadmin/schools
// @access  Private (Super Admin only) - This would be protected by middleware
const createSchool = asyncHandler(async (req, res) => {
  const { name, institutionType, surchargeAmount, features } = req.body;

  if (!name || !institutionType) {
    res.status(400);
    throw new Error('Please add all required fields: name and institutionType');
  }

  // Generate a random password for the school admin
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('default_admin_password', salt); // Consider generating a strong random password or having a separate registration for school admin

  const school = await School.create({
    instituteCode: name, // Assuming 'name' will be used as instituteCode for now
    password: hashedPassword,
    institutionType,
    paymentConfig: {
      surchargeAmount: surchargeAmount || 0,
    },
    features: {
      transport: features?.transport || false,
      sms: features?.sms || false,
      // Add other default features or parse from input
    },
  });

  if (school) {
    res.status(201).json({
      _id: school.id,
      instituteCode: school.instituteCode,
      institutionType: school.institutionType,
      paymentConfig: school.paymentConfig,
      features: school.features,
    });
  } else {
    res.status(400);
    throw new Error('Invalid school data');
  }
});

// @desc    Get Super Admin Dashboard Stats
// @route   GET /api/superadmin/dashboard/stats
// @access  Private (Super Admin only)
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalActiveSchools = await School.countDocuments({});
  const totalStudents = await User.countDocuments({ role: 'Student' });

  const totalRevenueResult = await FeeRecord.aggregate([{
    $match: {
      status: 'Paid'
    }
  }, {
    $group: {
      _id: null,
      totalAmount: {
        $sum: '$amount'
      },
      totalSurcharge: {
        $sum: '$surcharge'
      },
      totalAdminCommission: {
        $sum: '$adminCommission'
      },
    },
  }, ]);

  const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalAmount : 0;
  const totalSurcharge = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalSurcharge : 0;
  const totalAdminCommission = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalAdminCommission : 0;


  res.status(200).json({
    totalActiveSchools,
    totalStudents,
    totalRevenue,
    totalSurcharge,
    totalAdminCommission,
  });
});

module.exports = {
  createSchool,
  getDashboardStats,
};







