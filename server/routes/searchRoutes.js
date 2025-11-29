const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { globalSearch } = require('../controllers/searchController');

/**
 * @route   GET /api/search
 * @desc    Global search across multiple collections
 * @access  Private
 */
router.get('/', protect, globalSearch);

module.exports = router;
