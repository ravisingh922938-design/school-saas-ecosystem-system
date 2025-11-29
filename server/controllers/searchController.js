const Tenant = require('../models/Tenant');
const { ErrorResponse } = require('../utils/errorResponse');

/**
 * @desc    Global search across multiple collections
 * @route   GET /api/search
 * @access  Private
 */
exports.globalSearch = async (req, res, next) => {
  try {
    const { q } = req.query;

    // Return empty results if no search query
    if (!q || q.trim() === '') {
      return res.status(200).json({
        success: true,
        data: {
          tenants: [],
          tickets: [],
          users: []
        }
      });
    }

    // Create case-insensitive regex pattern
    const searchRegex = new RegExp(q, 'i');

    // Search across collections in parallel
    const [tenants] = await Promise.all([
      // Search Tenants
      Tenant.find({
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } }
        ]
      }).select('_id name type email logo status')
    ]);

    // Format the response
    const results = {
      tenants,
      tickets: [], // Placeholder for future implementation
      users: []    // Placeholder for future implementation
    };

    res.status(200).json({
      success: true,
      data: results
    });

  } catch (error) {
    next(error);
  }
};
