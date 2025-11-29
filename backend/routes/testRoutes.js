const express = require('express');
const router = express.Router();
const { createTest, submitTest } = require('../controllers/testController');
// const { protect } = require('../middleware/authMiddleware'); // Assuming these routes will be protected

router.post('/', createTest); // Protected by admin/teacher role
router.post('/:id/submit', submitTest); // Protected by student role

module.exports = router;


