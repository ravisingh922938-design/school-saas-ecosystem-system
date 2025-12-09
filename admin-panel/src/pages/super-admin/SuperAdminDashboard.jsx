import React, { useEffect, useState } from 'react';
import { DollarSign, Building, Users, Activity, LogOut, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const SuperAdminDashboard = () => {
    // State for stats
    const [stats, setStats] = useState({ revenue: 0, schools: 0, students: 0, teachers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Filhal dummy data simulate kar rahe hain (Backend connect hone tak)
        setTimeout(() => {
            setStats({ revenue: 4500000, schools: 12, students: 1200, teachers: 50 });
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">

            {/* SIDEBAR */}
            <aside className="w-64 bg-indigo-900 text-white hidden md:flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-indigo-800 flex items-center gap-2">
                    <Building size={24} /> SaaS Admin
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-indigo-800 rounded-lg cursor-pointer">
                        <Activity size={20} /> Dashboard
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-indigo-800 rounded-lg cursor-pointer transition">
                        <Building size={20} /> Manage Schools
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-indigo-800 rounded-lg cursor-pointer transition">
                        <DollarSign size={20} /> Finances
                    </div>
                </nav>
                <Link to="/" className="p-4 border-t border-indigo-800 flex items-center gap-2 hover:bg-indigo-800 transition">
                    <LogOut size={20} /> Logout
                </Link>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 overflow-y-auto">

                {/* Header with ADD SCHOOL Button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>
                    <Link to="/super-admin/add-school">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition flex items-center gap-2">
                            + Add New School
                        </button>
                    </Link>
                </div>

                {/* Stats Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-indigo-600" size={40} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Revenue', val: `₹ ${stats.revenue.toLocaleString()}`, icon: <DollarSign />, color: 'bg-green-500' },
                            { label: 'Active Schools', val: stats.schools, icon: <Building />, color: 'bg-blue-500' },
                            { label: 'Total Students', val: stats.students, icon: <Users />, color: 'bg-purple-500' },
                            { label: 'Total Teachers', val: stats.teachers, icon: <Activity />, color: 'bg-red-500' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4">
                                <div className={`p-4 rounded-full text-white ${stat.color}`}>{stat.icon}</div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{stat.val}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recent Activity Table (Placeholder) */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Schools Onboarded</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                    <th className="py-3 px-2">School Name</th>
                                    <th className="py-3 px-2">Plan</th>
                                    <th className="py-3 px-2">Date Joined</th>
                                    <th className="py-3 px-2">Status</th>
                                    <th className="py-3 px-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="py-4 px-2 font-medium text-gray-700">Delhi Public School</td>
                                    <td className="py-4 px-2"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">Premium</span></td>
                                    <td className="py-4 px-2 text-gray-500">20 Oct 2025</td>
                                    <td className="py-4 px-2 text-green-600 font-bold text-sm">Active</td>
                                    <td className="py-4 px-2"><button className="text-blue-600 hover:underline text-sm">Manage</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default SuperAdminDashboard;