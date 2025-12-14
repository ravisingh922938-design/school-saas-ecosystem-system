import React, { useState, useEffect } from 'react';
import {
    DollarSign, Building, Users, Activity, LogOut, Plus,
    Trash2, Menu, X, Bell, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// API URL Setup
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SuperAdminDashboard = () => {
    const [schools, setSchools] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal State
    const [loading, setLoading] = useState(false);

    // ✅ NEW: Mobile Sidebar State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        schoolName: '', schoolCode: '', email: '', password: '',
        themeColor: '#2563eb', logo: '', tagline: '', address: ''
    });

    // Load Schools (Dummy + API Logic)
    useEffect(() => {
        // const fetchSchools = async () => { ... }
        setSchools([
            { _id: 1, name: "Delhi Public School", schoolId: "DPS", email: "principal@dps.com" },
            { _id: 2, name: "St. Xavier's", schoolId: "STX", email: "principal@stx.com" },
            { _id: 3, name: "Ryan International", schoolId: "RYN", email: "principal@ryan.com" }
        ]);
    }, []);

    const handleAddSchool = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/super-admin/add-school`, formData);
            alert("✅ School Created Successfully!");
            setShowModal(false);
        } catch (err) {
            console.error(err);
            // alert("Error adding school"); // API connect hone par uncomment karein
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">

            {/* ✅ 1. MOBILE OVERLAY (Click to Close Sidebar) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* ✅ 2. SIDEBAR (Responsive) */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 shadow-2xl md:shadow-none h-full`}
            >
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700 bg-slate-950">
                    <div className="text-xl font-bold flex items-center gap-2">
                        <Building className="text-blue-400" /> SchoolOS
                    </div>
                    {/* Close Button for Mobile */}
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <div className="p-3 bg-blue-600 rounded-lg cursor-pointer flex gap-3 shadow-lg shadow-blue-900/20">
                        <Building size={20} /> Manage Schools
                    </div>
                    <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer flex gap-3 text-slate-300 hover:text-white transition">
                        <DollarSign size={20} /> Revenue
                    </div>
                    <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer flex gap-3 text-slate-300 hover:text-white transition">
                        <Activity size={20} /> System Logs
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-slate-700 bg-slate-950">
                    <Link to="/select-role" className="p-3 hover:bg-red-600/20 hover:text-red-400 text-slate-400 rounded-lg cursor-pointer flex gap-3 transition">
                        <LogOut size={20} /> Logout
                    </Link>
                </div>
            </aside>

            {/* ✅ 3. MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">

                {/* Top Header (With Mobile Menu Button) */}
                <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-4 md:px-8 shadow-sm z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Super Admin Panel</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-full text-gray-500"><Search size={20} /></div>
                        <div className="bg-gray-100 p-2 rounded-full text-gray-500 relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </div>
                        <img src="https://ui-avatars.com/api/?name=Super+Admin&background=0f172a&color=fff" className="w-9 h-9 rounded-full border border-gray-300" alt="Admin" />
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">System Overview</h1>
                            <p className="text-sm text-gray-500">Manage all registered schools and subscriptions.</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200 transition transform active:scale-95 w-full sm:w-auto justify-center"
                        >
                            <Plus size={20} /> Add New School
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Revenue', val: '₹ 45 L', icon: <DollarSign />, color: 'bg-emerald-500' },
                            { label: 'Active Schools', val: '12', icon: <Building />, color: 'bg-blue-500' },
                            { label: 'Total Students', val: '15k', icon: <Users />, color: 'bg-violet-500' },
                            { label: 'System Health', val: '99%', icon: <Activity />, color: 'bg-orange-500' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100 hover:shadow-md transition">
                                <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg shadow-gray-200`}>{stat.icon}</div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-2xl font-extrabold text-gray-800">{stat.val}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* School List Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="p-5">School Name</th>
                                        <th className="p-5">Code</th>
                                        <th className="p-5">Principal Email</th>
                                        <th className="p-5">Status</th>
                                        <th className="p-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {schools.map((school) => (
                                        <tr key={school._id} className="hover:bg-gray-50/80 transition">
                                            <td className="p-5 font-bold text-gray-800">{school.name}</td>
                                            <td className="p-5"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">{school.schoolId}</span></td>
                                            <td className="p-5 text-gray-500 text-sm">{school.email}</td>
                                            <td className="p-5"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span></td>
                                            <td className="p-5 text-gray-400 hover:text-red-500 cursor-pointer transition"><Trash2 size={18} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* --- ADD SCHOOL MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800">Setup New School</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleAddSchool} className="p-6 md:p-8 space-y-6">
                            {/* Form Content (Same as before) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">School Name</label>
                                    <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        placeholder="e.g. Delhi Public School"
                                        value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">School Code</label>
                                    <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                                        placeholder="e.g. DPS01"
                                        value={formData.schoolCode} onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Principal Email</label>
                                    <input required type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="principal@dps.com"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Password</label>
                                    <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Secret Password"
                                        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                            </div>

                            {/* Branding Section */}
                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-indigo-600 mb-4 flex items-center gap-2"><Layers size={16} /> Branding & Theme</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Theme Color</label>
                                        <div className="flex gap-2">
                                            <input type="color" className="h-11 w-12 border rounded-lg cursor-pointer p-1"
                                                value={formData.themeColor} onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })} />
                                            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500" readOnly value={formData.themeColor} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Logo URL</label>
                                        <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="https://example.com/logo.png"
                                            value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold shadow-lg transition transform active:scale-95">
                                    {loading ? 'Creating...' : 'Create School'}
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