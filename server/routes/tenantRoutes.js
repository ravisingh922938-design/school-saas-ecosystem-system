const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});
const { protect, admin } = require('../middleware/authMiddleware');
const { createLog } = require('../utils/logger');
const { impersonateTenant } = require('../controllers/tenantController');

// @route   GET /api/tenants
// @desc    Get all tenants with filtering and sorting
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let query = {};

        // Filtering
        if (req.query.type) {
            query.type = req.query.type;
        }
        if (req.query.status) {
            query.status = req.query.status;
        }

        let tenants = Tenant.find(query);

        // Sorting
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            const sortBy = {};
            sortBy[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            tenants = tenants.sort(sortBy);
        }

        const fetchedTenants = await tenants.exec();
        res.json(fetchedTenants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/tenants
// @desc    Create a new tenant
// @access  Private
router.post(
  '/',
  [
    protect,
    upload.single('logo'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Valid email is required').isEmail(),
      check('commercials.platformFee', 'Platform Fee must be a number').isNumeric()
    ]
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, type, studentCount, revenueModel, commercials, features, status } = req.body;
    
    // Prepare tenant data
    const tenantData = {
      name,
      email,
      type,
      studentCount,
      revenueModel,
      commercials,
      features,
      status
    };

    // Add logo path if file was uploaded
    if (req.file) {
      tenantData.logo = '/uploads/' + req.file.filename;
    }

    try {
      // Validate email uniqueness
      let tenant = await Tenant.findOne({ email });
      if (tenant) {
        return res.status(400).json({ msg: 'Tenant with this email already exists' });
      }

      // Create new tenant with the prepared data
      tenant = new Tenant(tenantData);
      await tenant.save();
      await createLog("CREATE_TENANT", `Added ${tenant.name}`, req);
      res.status(201).json(tenant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/tenants/:id
// @desc    Update tenant details
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTenant = await Tenant.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTenant) {
            return res.status(404).json({ msg: 'Tenant not found' });
        }

        res.json(updatedTenant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH /api/tenants/:id/status
// @desc    Toggle tenant status between Active and Blocked
// @access  Private
router.patch('/:id/status', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const tenant = await Tenant.findById(id);

        if (!tenant) {
            return res.status(404).json({ msg: 'Tenant not found' });
        }

        tenant.status = tenant.status === 'Active' ? 'Blocked' : 'Active';
        await tenant.save();
        await createLog("BLOCK_TENANT", `Blocked ${tenant.name}`, req);
        res.json(tenant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/tenants/:id
// @desc    Delete a tenant
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const tenant = await Tenant.findByIdAndDelete(id);

        if (!tenant) {
            return res.status(404).json({ msg: 'Tenant not found' });
        }

        await createLog("DELETE_TENANT", `Deleted ${tenant.name}`, req);
        res.json({ msg: 'Tenant removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/tenants/:id/impersonate
// @desc    Impersonate a tenant (Super Admin only)
// @access  Private/Admin
router.post('/:id/impersonate', [protect, admin], impersonateTenant);

module.exports = router;
