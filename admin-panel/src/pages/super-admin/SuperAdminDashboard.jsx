import React, { useState, useEffect } from 'react';
import {
    DollarSign, Building, Users, Activity, LogOut, Plus,
    Trash2, Menu, X, Bell, Search, Layers, ShoppingBag, Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// API URL Setup
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SuperAdminDashboard = () => {
    const [schools, setSchools] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // ✅ FORM STATE (Logo File ke sath)
    const [formData, setFormData] = useState({
        schoolName: '',
        schoolCode: '',
        email: '',
        password: '',
        themeColor: '#2563eb', // Default Blue
        tagline: '',
        address: '',
        logoFile: null // Yahan image file store hogi
    });

    // 1. Fetch Schools List
    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            const res = await axios.get(`${API_URL}/super-admin/schools`);
            if (res.data.success) {
                setSchools(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching schools", err);
        }
    };

    // 2. Handle Add School (With Image Upload)
    const handleAddSchool = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // FormData Banana padega kyunki hum File bhej rahe hain
            const data = new FormData();
            data.append('schoolName', formData.schoolName);
            data.append('schoolCode', formData.schoolCode);
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('themeColor', formData.themeColor);
            data.append('tagline', formData.tagline);
            data.append('address', formData.address);

            // Agar Logo select kiya hai to attach karein
            if (formData.logoFile) {
                data.append('logoFile', formData.logoFile);
            }

            // Backend Request (Content-Type: multipart/form-data zaruri hai)
            await axios.post(`${API_URL}/super-admin/add-school`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("✅ School & Principal ID Created Successfully!");
            setShowModal(false);
            fetchSchools(); // List refresh

            // Reset Form
            setFormData({
                schoolName: '', schoolCode: '', email: '', password: '',
                themeColor: '#2563eb', logoFile: null, tagline: '', address: ''
            });

        } catch (err) {
            console.error(err);
            alert("❌ Error: " + (err.response?.data?.message || "Failed to create school"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">

            {/* 1. MOBILE OVERLAY */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* 2. SIDEBAR */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 shadow-2xl md:shadow-none h-full border-r border-slate-800`}
            >
                {/* Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Layers className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">SchoolOS</h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Super Admin</p>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* MENU LINKS */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="p-3.5 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl cursor-pointer flex items-center gap-3 transition">
                        <Building size={20} /> <span className="font-medium">Manage Schools</span>
                    </div>

                    {/* ✅ Store Orders Link Included */}
                    <Link to="/super-admin/orders" className="p-3.5 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl cursor-pointer flex items-center gap-3 transition group">
                        <ShoppingBag size={20} /> <span className="font-medium">Store Orders</span>
                    </Link>

                    <div className="p-3.5 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl cursor-pointer flex items-center gap-3 transition group">
                        <DollarSign size={20} /> <span className="font-medium">Revenue</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-950">
                    <Link to="/select-role" className="w-full p-3.5 bg-slate-900 border border-slate-700 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 text-slate-400 rounded-xl cursor-pointer flex justify-center items-center gap-2 transition duration-200">
                        <LogOut size={18} /> <span className="font-bold text-sm">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* 3. MAIN CONTENT */}
            <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
                <header className="h-20 bg-white border-b border-gray-200 flex justify-between items-center px-6 md:px-10 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Dashboard Overview</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2.5 rounded-full text-gray-500 relative cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                        <img src="https://ui-avatars.com/api/?name=Super+Admin&background=0f172a&color=fff" className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition" alt="Admin" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Overview</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage all registered schools and subscriptions.</p>
                        </div>
                        <button onClick={() => setShowModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-xl shadow-slate-200 transition transform active:scale-95">
                            <Plus size={20} /> Add New School
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: 'Total Revenue', val: '₹ 45 L', icon: <DollarSign />, color: 'bg-emerald-500' },
                            { label: 'Active Schools', val: schools.length || '0', icon: <Building />, color: 'bg-blue-500' },
                            { label: 'Total Students', val: '15k', icon: <Users />, color: 'bg-violet-500' },
                            { label: 'System Health', val: '99%', icon: <Activity />, color: 'bg-orange-500' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition duration-300 group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3.5 rounded-xl text-white ${stat.color} shadow-lg group-hover:scale-110 transition duration-300`}>
                                        {stat.icon}
                                    </div>
                                    <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Update</span>
                                </div>
                                <h3 className="text-3xl font-extrabold text-gray-900">{stat.val}</h3>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* School List Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="p-6">School Name</th>
                                        <th className="p-6">Code</th>
                                        <th className="p-6">Principal Email</th>
                                        <th className="p-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {schools.map((school) => (
                                        <tr key={school._id} className="hover:bg-gray-50/80 transition group">
                                            <td className="p-6 flex items-center gap-3">
                                                {/* Logo Display */}
                                                <img
                                                    src={school.branding?.logo || "https://via.placeholder.com/40"}
                                                    className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-200"
                                                    alt="School Logo"
                                                />
                                                <span className="font-bold text-gray-900 text-sm">{school.name}</span>
                                            </td>
                                            <td className="p-6"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">{school.schoolId}</span></td>
                                            <td className="p-6 text-gray-500 text-sm font-medium">{school.email}</td>
                                            <td className="p-6"><button className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* --- COMPLETE ADD SCHOOL MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900">Setup New School</h2>
                                <p className="text-sm text-gray-500">Create account & customize branding.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleAddSchool} className="p-6 md:p-8 space-y-8">

                            {/* SECTION 1: ACCOUNT DETAILS */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest border-b border-blue-100 pb-2 mb-4">1. Account Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">School Name</label>
                                        <input required type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="e.g. Delhi Public School"
                                            value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">School Code</label>
                                        <input required type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold"
                                            placeholder="e.g. DPS01"
                                            value={formData.schoolCode} onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Principal Email</label>
                                        <input required type="email" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="principal@dps.com"
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Password</label>
                                        <input required type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Secret Password"
                                            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: BRANDING (COLOR & LOGO) */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-purple-600 uppercase tracking-widest border-b border-purple-100 pb-2 mb-4">2. App Branding</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Theme Color</label>
                                        <div className="flex gap-3">
                                            <input type="color" className="h-12 w-14 border border-gray-200 rounded-xl cursor-pointer p-1"
                                                value={formData.themeColor} onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })} />
                                            <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-mono" readOnly value={formData.themeColor} />
                                        </div>
                                    </div>

                                    {/* ✅ FILE UPLOAD INPUT */}
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">School Logo</label>
                                        <div className="relative border border-gray-200 bg-gray-50 rounded-xl p-2 flex items-center gap-2 hover:bg-gray-100 transition cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                                                onChange={(e) => setFormData({ ...formData, logoFile: e.target.files[0] })}
                                            />
                                            <div className="bg-white border border-gray-200 p-2 rounded-lg text-gray-500"><Upload size={18} /></div>
                                            <span className="text-sm text-gray-500 truncate w-40">
                                                {formData.logoFile ? formData.logoFile.name : "Click to Upload (PNG/JPG)"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Tagline</label>
                                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="e.g. Excellence in Education"
                                        value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} />
                                </div>
                            </div>

                            {/* SECTION 3: CONTACT */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest border-b border-green-100 pb-2 mb-4">3. Contact Info</h3>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Address</label>
                                    <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Full School Address"
                                        value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold shadow-lg shadow-slate-300 transition transform active:scale-95 flex justify-center items-center gap-2">
                                    {loading ? 'Creating...' : <>Create School <Plus size={18} /></>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SuperAdminDashboard;