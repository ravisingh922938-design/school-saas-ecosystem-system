import React, { useState, useEffect } from 'react';
import { DollarSign, Building, Users, Activity, LogOut, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// API URL Setup
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SuperAdminDashboard = () => {
    const [schools, setSchools] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal Control
    const [loading, setLoading] = useState(false);

    // Form State (School + Branding)
    const [formData, setFormData] = useState({
        schoolName: '', schoolCode: '', email: '', password: '',
        themeColor: '#2563eb', logo: '', tagline: '', address: ''
    });

    // Load Schools (Dummy for now, replace with API later)
    useEffect(() => {
        // API call example:
        // const fetchSchools = async () => { ... }
        // fetchSchools();

        // Demo Data
        setSchools([
            { _id: 1, name: "Delhi Public School", schoolId: "DPS", email: "dps@school.com" },
            { _id: 2, name: "St. Xavier's", schoolId: "STX", email: "stx@school.com" }
        ]);
    }, []);

    // Handle Add School
    const handleAddSchool = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // API Call to Add School
            await axios.post(`${API_URL}/super-admin/add-school`, formData);
            alert("✅ School & Branding Created Successfully!");
            setShowModal(false);
            // Refresh logic here...
        } catch (err) {
            console.error(err);
            alert("Error adding school");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">

            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col p-4">
                <div className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <Building /> SchoolOS
                </div>
                <nav className="space-y-2">
                    <div className="p-3 bg-blue-600 rounded-lg cursor-pointer flex gap-3"><Building size={20} /> Manage Schools</div>
                    <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer flex gap-3"><DollarSign size={20} /> Revenue</div>
                    <Link to="/select-role" className="p-3 hover:bg-red-600 rounded-lg cursor-pointer flex gap-3 mt-10">
                        <LogOut size={20} /> Logout
                    </Link>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>
                    <button
                        onClick={() => setShowModal(true)} // Open Modal
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg transition"
                    >
                        <Plus size={20} /> Add New School
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Revenue', val: '₹ 45 L', icon: <DollarSign />, color: 'bg-green-500' },
                        { label: 'Active Schools', val: '12', icon: <Building />, color: 'bg-blue-500' },
                        { label: 'Total Students', val: '15,400', icon: <Users />, color: 'bg-purple-500' },
                        { label: 'Pending Dues', val: '₹ 2.3 L', icon: <Activity />, color: 'bg-red-500' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4 border border-gray-100">
                            <div className={`p-4 rounded-full text-white ${stat.color}`}>{stat.icon}</div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stat.val}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* School List Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 border-b">
                            <tr>
                                <th className="p-4">School Name</th>
                                <th className="p-4">Code</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map((school) => (
                                <tr key={school._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-bold text-gray-800">{school.name}</td>
                                    <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{school.schoolId}</span></td>
                                    <td className="p-4 text-gray-500">{school.email}</td>
                                    <td className="p-4"><span className="text-green-600 font-bold text-sm">● Active</span></td>
                                    <td className="p-4 text-red-500 cursor-pointer hover:bg-red-50 rounded"><Trash2 size={18} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* --- ADD SCHOOL MODAL (POPUP) --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">

                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-800">Add New School</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleAddSchool} className="p-8 space-y-6">

                            {/* SECTION 1: LOGIN DETAILS */}
                            <div>
                                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b pb-2">1. Account Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">School Name</label>
                                        <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="e.g. Delhi Public School"
                                            value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">School Code</label>
                                        <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                                            placeholder="e.g. DPS01"
                                            value={formData.schoolCode} onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Principal Email</label>
                                        <input required type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="principal@dps.com"
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Password</label>
                                        <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Secret Password"
                                            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: BRANDING (COLOR & LOGO) */}
                            <div>
                                <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-4 border-b pb-2">2. App Branding</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Theme Color</label>
                                        <div className="flex gap-2 items-center">
                                            <input type="color" className="w-12 h-12 border-2 border-gray-200 rounded-lg cursor-pointer p-1"
                                                value={formData.themeColor} onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                                            />
                                            <input type="text" className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500" readOnly value={formData.themeColor} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Logo URL</label>
                                        <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                            placeholder="https://..."
                                            value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Tagline / Motto</label>
                                    <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="e.g. Excellence in Education"
                                        value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} />
                                </div>
                            </div>

                            {/* SECTION 3: CONTACT */}
                            <div>
                                <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-4 border-b pb-2">3. Contact Info</h3>
                                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Full School Address"
                                    value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-bold transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] font-bold transition transform disabled:opacity-70">
                                    {loading ? 'Creating School...' : 'Create School & App'}
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