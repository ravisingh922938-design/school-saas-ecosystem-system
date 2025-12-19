import React, { useState } from 'react';
import { ShoppingBag, Search, Plus, CheckCircle, ShoppingCart, X } from 'lucide-react';
import axios from 'axios';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SchoolStore = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    // --- DUMMY PRODUCTS DATA ---
    const products = [
        { id: 1, name: "Custom ID Cards (PVC)", category: "Branding", price: 25, unit: "pc", img: "https://cdn-icons-png.flaticon.com/512/10405/10405469.png" },
        { id: 2, name: "School Belt (Logo Printed)", category: "Uniform", price: 150, unit: "pc", img: "https://cdn-icons-png.flaticon.com/512/9382/9382187.png" },
        { id: 3, name: "Student Diary (Custom Cover)", category: "Stationery", price: 120, unit: "pc", img: "https://cdn-icons-png.flaticon.com/512/3238/3238016.png" },
        { id: 4, name: "Flex Banner (6x4 ft)", category: "Marketing", price: 450, unit: "pc", img: "https://cdn-icons-png.flaticon.com/512/2680/2680908.png" },
        { id: 5, name: "Staff Polo T-Shirt", category: "Uniform", price: 350, unit: "pc", img: "https://cdn-icons-png.flaticon.com/512/892/892458.png" },
        { id: 6, name: "Report Card Sheets (A4)", category: "Stationery", price: 5, unit: "sheet", img: "https://cdn-icons-png.flaticon.com/512/2997/2997322.png" },
    ];

    const categories = ["All", "Branding", "Uniform", "Stationery", "Marketing"];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    const addToCart = (product) => {
        setCart([...cart, { ...product, qty: 10 }]); // Default qty 10
        alert(`${product.name} added to Order List!`);
    };

    const placeOrder = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        const orderData = {
            schoolId: user?.schoolId || 'Unknown',
            schoolName: user?.name || "Unknown School",
            items: cart,
            total: cart.reduce((total, item) => total + (item.price * item.qty), 0)
        };

        try {
            await axios.post(`${API_URL}/orders/create`, orderData);
            alert("✅ Order Placed Successfully! Super Admin will contact you.");
            setCart([]); // Cart khali karo
            setShowCart(false);
        } catch (err) {
            alert("Failed to place order.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <ShoppingBag className="text-blue-600" /> School Mart
                    </h1>
                    <p className="text-gray-500">Order customized supplies for your institute.</p>
                </div>

                <div className="flex gap-4 items-center">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="text" placeholder="Search items..." className="pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none w-64" />
                    </div>

                    {/* Cart Button */}
                    <button onClick={() => setShowCart(true)} className="relative bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition">
                        <ShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${activeCategory === cat
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                            <img src={item.img} alt={item.name} className="h-24 w-24 object-contain group-hover:scale-110 transition duration-500" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">{item.category}</p>
                                <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
                                <p className="text-gray-500 text-sm">Min Order: 10 {item.unit}s</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xl font-extrabold text-gray-900">₹{item.price}<span className="text-xs font-normal text-gray-400">/{item.unit}</span></span>
                            <button
                                onClick={() => addToCart(item)}
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition flex items-center gap-1"
                            >
                                <Plus size={16} /> Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CART MODAL (Slide-over) */}
            {showCart && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">

                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-2xl font-bold">Your Order</h2>
                            <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-400 mt-20">
                                    <ShoppingBag size={48} className="mx-auto mb-2 opacity-50" />
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                cart.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl">
                                        <img src={item.img} className="w-12 h-12" alt="" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Rate: ₹{item.price} | Qty: {item.qty}</p>
                                        </div>
                                        <span className="font-bold">₹{item.price * item.qty}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between text-lg font-bold mb-4">
                                    <span>Total</span>
                                    <span>₹{cart.reduce((total, item) => total + (item.price * item.qty), 0)}</span>
                                </div>
                                <button
                                    onClick={placeOrder}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center gap-2 items-center"
                                >
                                    <CheckCircle size={20} /> Place Bulk Order
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-2">Invoice will be added to your monthly bill.</p>
                            </div>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
};

// 👇 YE LINE BAHUT ZARURI HAI
export default SchoolStore;