import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StoreOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await axios.get(`${API_URL}/orders/all`);
        if (res.data.success) setOrders(res.data.data);
    };

    const updateStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'Pending' ? 'Shipped' : 'Delivered';
        await axios.post(`${API_URL}/orders/update-status`, { id, status: nextStatus });
        fetchOrders(); // Refresh
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Store Orders 📦</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">{order.schoolName}</h3>
                            <p className="text-sm text-gray-500">Total: ₹{order.total} • Items: {order.items.length}</p>
                            <div className="text-xs text-gray-400 mt-1">
                                {order.items.map(i => `${i.name} (x${i.qty})`).join(', ')}
                            </div>
                        </div>
                        <button
                            onClick={() => updateStatus(order._id, order.status)}
                            className={`px-4 py-2 rounded-lg font-bold text-white text-xs ${order.status === 'Delivered' ? 'bg-green-600' :
                                order.status === 'Shipped' ? 'bg-blue-600' : 'bg-orange-500'
                                }`}
                        >
                            {order.status} (Tap to Change)
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreOrders;