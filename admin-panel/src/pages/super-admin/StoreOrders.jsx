import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StoreOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    // 1. Fetch All Orders
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/orders/all`);
            if (res.data.success) {
                setOrders(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Update Status Function
    const handleStatusUpdate = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'Pending' ? 'Shipped' : currentStatus === 'Shipped' ? 'Delivered' : 'Pending';

        // Optimistic Update (UI pehle update karo)
        const updatedOrders = orders.map(order =>
            order._id === id ? { ...order, status: nextStatus } : order
        );
        setOrders(updatedOrders);

        try {
            await axios.post(`${API_URL}/orders/update-status`, { id, status: nextStatus });
        } catch (err) {
            alert("Failed to update status");
            fetchOrders(); // Revert on error
        }
    };

    const getStatusColor = (status) => {
        if (status === 'Delivered') return 'bg-green-100 text-green-700 border-green-200';
        if (status === 'Shipped') return 'bg-blue-100 text-blue-700 border-blue-200';
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">

            {/* Header */}
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/super-admin" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition shadow-sm">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Store Orders 📦</h1>
                        <p className="text-gray-500 font-medium">Track and manage school supply requests.</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2">
                        {['All', 'Pending', 'Shipped', 'Delivered'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${filter === status ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-auto">
                        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input type="text" placeholder="Search School..." className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {loading ? (
                        <p className="text-center text-gray-400 py-10">Loading orders...</p>
                    ) : orders.filter(o => filter === 'All' || o.status === filter).length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                            <Package size={48} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500 font-medium">No orders found.</p>
                        </div>
                    ) : (
                        orders.filter(o => filter === 'All' || o.status === filter).map((order) => (
                            <div key={order._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition group">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                                    {/* Order Info */}
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                            {order.status === 'Delivered' ? <CheckCircle size={24} /> :
                                                order.status === 'Shipped' ? <Truck size={24} /> : <Clock size={24} />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{order.schoolName}</h3>
                                            <div className="text-sm text-gray-500 mt-1">
                                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">#{order._id.slice(-6).toUpperCase()}</span>
                                                <span className="mx-2">•</span>
                                                <span>{new Date(order.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-indigo-600 font-bold mt-2">
                                                {order.items.length} Items: {order.items.map(i => i.name).join(', ')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                                        <div className="text-right">
                                            <p className="text-xl font-black text-gray-900">₹{order.total}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Total Amount</p>
                                        </div>

                                        <button
                                            onClick={() => handleStatusUpdate(order._id, order.status)}
                                            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition active:scale-95 ${getStatusColor(order.status)}`}
                                        >
                                            {order.status === 'Pending' ? 'Mark Shipped' :
                                                order.status === 'Shipped' ? 'Mark Delivered' : 'Completed'}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default StoreOrders;