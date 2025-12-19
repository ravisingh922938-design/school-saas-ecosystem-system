const Order = require('../models/Order');

// 1. Create Order (Principal)
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ success: true, message: "Order Placed!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Get All Orders (Super Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. Update Status (Super Admin)
exports.updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await Order.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};