const express = require('express');
const router = express.Router();
const {
  verifyInstituteCode,
  login,
} = require('../controllers/authController');

router.post('/verifyInstituteCode', verifyInstituteCode);
router.post('/login', login);

module.exports = router;










