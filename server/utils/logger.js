const Log = require('../models/Log');

const createLog = async (action, details, req) => {
    try {
        let adminId = null;
        if (req.user && req.user.id) {
            adminId = req.user.id;
        }

        const newLog = new Log({
            adminId,
            action,
            details,
            ipAddress: req.ip, // req.ip might need a proxy setup for production
        });

        await newLog.save();
    } catch (err) {
        console.error('Error creating log:', err.message);
    }
};

module.exports = { createLog };

