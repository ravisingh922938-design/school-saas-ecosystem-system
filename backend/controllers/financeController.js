const asyncHandler = require('express-async-handler');
const FeeRecord = require('../models/FeeRecord');
const School = require('../models/School'); // Assuming School model might be needed for context

// @desc    Get admin dues (commission from cash payments)
// @route   GET /api/finance/admin-dues
// @access  Private (Super Admin)
const getAdminDues = asyncHandler(async (req, res) => {
  const dues = await FeeRecord.aggregate([{
    $match: {
      paymentMode: 'Cash',
      isSettled: false,
    },
  }, {
    $group: {
      _id: '$schoolId',
      totalAdminCommission: {
        $sum: '$adminCommission'
      },
    },
  }, {
    $lookup: {
      from: 'schools', // The collection name for School model
      localField: '_id',
      foreignField: '_id',
      as: 'schoolDetails',
    },
  }, {
    $unwind: '$schoolDetails',
  }, {
    $project: {
      _id: 0,
      schoolId: '$_id',
      schoolName: '$schoolDetails.instituteCode', // Assuming instituteCode can be used as school name
      totalAdminCommission: 1,
    },
  }, ]);

  res.status(200).json(dues);
});

// @desc    Settle admin dues for a specific school
// @route   PUT /api/finance/settle-dues
// @access  Private (Super Admin)
const settleDues = asyncHandler(async (req, res) => {
  const { schoolId } = req.body;

  if (!schoolId) {
    res.status(400);
    throw new Error('Please provide schoolId');
  }

  const result = await FeeRecord.updateMany({
    schoolId,
    paymentMode: 'Cash',
    isSettled: false,
  }, {
    $set: {
      isSettled: true
    }
  });

  res.status(200).json({
    message: `${result.modifiedCount} cash fee records settled for school ID ${schoolId}`,
  });
});

module.exports = {
  getAdminDues,
  settleDues,
};
