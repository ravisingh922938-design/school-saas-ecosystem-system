const Tenant = require('../models/Tenant');
const jwt = require('jsonwebtoken');

// @desc    Impersonate a tenant
// @route   POST /api/tenants/:id/impersonate
// @access  Private/Admin
exports.impersonateTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);
        
        if (!tenant) {
            return res.status(404).json({ success: false, message: 'Tenant not found' });
        }

        // Create token with tenant ID and role
        const token = jwt.sign(
            { id: tenant._id, role: 'school' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            success: true,
            token,
            tenant: {
                id: tenant._id,
                name: tenant.name,
                email: tenant.email
            }
        });
    } catch (error) {
        console.error('Impersonation error:', error);
        res.status(500).json({ success: false, message: 'Server error during impersonation' });
    }
};
