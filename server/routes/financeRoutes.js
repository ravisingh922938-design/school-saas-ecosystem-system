const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/finance/ledger
// @desc    Fetch financial ledger for commission-based tenants
// @access  Private
router.get('/ledger', protect, async (req, res) => {
    try {
        const commissionTenants = await Tenant.find({ revenueModel: 'Commission' });

        const ledgerData = commissionTenants.map(tenant => {
            const totalStudents = tenant.studentCount; // Assuming this is available
            const platformFee = tenant.commercials.platformFee; // Assuming platformFee is per student for commission model
            const revenueCollected = totalStudents * platformFee; // This is a placeholder, actual revenue would come from transactions
            const adminShareDue = revenueCollected * 0.10; // Example: 10% commission

            return {
                schoolName: tenant.name,
                totalStudents: totalStudents,
                revenueCollected: revenueCollected,
                adminShareDue: adminShareDue,
            };
        });

        res.json(ledgerData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/finance/settle/:id
// @desc    Mark a tenant's dues as paid and update lastPaymentDate
// @access  Private
router.post('/settle/:id', protect, async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ msg: 'Tenant not found' });
        }

        tenant.lastPaymentDate = Date.now();
        await tenant.save();

        res.json({ msg: 'Tenant dues settled successfully', tenant });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

