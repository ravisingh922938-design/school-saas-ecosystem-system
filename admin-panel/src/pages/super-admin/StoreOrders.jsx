import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Package, Truck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const StoreOrders = () => {
    // Dummy Order Data
    const [orders, setOrders] = useState([
        { id: "ORD-001", school: "Delhi Public School", item: "500 ID Cards", price: "₹12,500", status: "Pending", date: "15 Oct" },
        { id: "ORD-002", school: "St. Xavier's", item: "10 Flex Banners", price: "₹4,500", status: "Shipped", date: "14 Oct" },
        { id: "ORD-003", school: "Ryan Int.", item: "100 Staff T-Shirts", price: "₹35,000", status: "Delivered", date: "12 Oct" },
    ]);

    const updateStatus = (id) => {
        const newStatus = prompt("Enter new status (Pending / Shipped / Delivered):");
        if (newStatus) {
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/super-admin" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Store Orders 🛒</h1>
                        <p className="text-gray-500">Manage orders placed by schools.</p>
                    </div>
                </div>
                <div className="bg-white px-4 py-2 border border-gray-200 rounded-xl flex items-center gap-2 shadow-sm">
                    <Search size={18} className="text-gray-400" />
                    <input type="text" placeholder="Search Order ID..." className="outline-none text-sm" />
                </div>
            </div>

            {/* Orders List */}
            <div className="max-w-6xl mx-auto space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition">

                        {/* Order Info */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className={`p-4 rounded-xl ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                <Package size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{order.item}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <span className="font-semibold text-indigo-600">{order.school}</span> • {order.date}
                                </p>
                                <p className="text-xs text-gray-400 font-mono mt-1">ID: {order.id}</p>
                            </div>
                        </div>

                        {/* Status & Action */}
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                                <p className="text-xl font-bold text-gray-900">{order.price}</p>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <button
                                onClick={() => updateStatus(order.id)}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition"
                            >
                                Update
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default StoreOrders;