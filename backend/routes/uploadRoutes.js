const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @desc    Upload image to Cloudinary
// @route   POST /api/upload/image
// @access  Private (e.g., School Admin)
router.post(
  '/image',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error('No image file provided');
    }

    try {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
          folder: 'school-saas', // Optional: specify a folder in Cloudinary
        }
      );
      res.status(200).json({
        secure_url: result.secure_url,
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500);
      throw new Error('Image upload failed');
    }
  })
);

module.exports = router;




