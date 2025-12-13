import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Bell, Search, Menu, User, Home, Layers,
    ShoppingBag, Calendar, ChevronRight, PlayCircle
} from 'lucide-react';

const SchoolDashboard = () => {
    const [user, setUser] = useState({ name: 'Principal', schoolId: 'SCHOOL' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    // App Features (Grid)
    const apps = [
        { name: "Students", icon: "👨‍🎓", color: "bg-blue-100", link: "/school/students" },
        { name: "Fees", icon: "₹", color: "bg-green-100", link: "/school/finance" },
        { name: "Store", icon: "🛍️", color: "bg-orange-100", link: "/school/store" },
        { name: "Exams", icon: "📝", color: "bg-purple-100", link: "/school/exams" },
        { name: "Staff", icon: "briefcase", color: "bg-pink-100", link: "/school/staff" },
        { name: "Bus", icon: "🚌", color: "bg-yellow-100", link: "/school/transport" },
        { name: "Library", icon: "📚", color: "bg-teal-100", link: "/school/library" },
        { name: "More", icon: "⚡", color: "bg-gray-100", link: "/school/settings" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans select-none">

            {/* --- 1. APP HEADER (Unacademy Style) --- */}
            <div className="bg-white px-5 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-indigo-100">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 leading-tight">Hi, {user.name} 👋</h1>
                        <p className="text-[10px] text-gray-500 font-medium">{user.schoolId}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition">
                        <Search size={20} />
                    </div>
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600 relative hover:bg-gray-200 transition">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-6">

                {/* --- 2. HERO BANNER (PW Style) --- */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-5 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                        <Layers size={120} />
                    </div>
                    <p className="text-xs font-medium text-indigo-100 uppercase tracking-wide mb-1">Updates</p>
                    <h2 className="text-2xl font-bold mb-2">School Annual Function</h2>
                    <p className="text-sm text-indigo-100 mb-4 opacity-90">Registration closing soon. Check details.</p>
                    <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition">
                        View Details
                    </button>
                </div>

                {/* --- 3. QUICK STATS (Horizontal Scroll) --- */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h3 className="font-bold text-gray-800">Overview</h3>
                        <span className="text-xs text-indigo-600 font-bold">View Report</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                            { label: "Students", val: "1,240", color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Revenue", val: "₹4.5L", color: "text-green-600", bg: "bg-green-50" },
                            { label: "Staff", val: "96%", color: "text-purple-600", bg: "bg-purple-50" }
                        ].map((stat, i) => (
                            <div key={i} className={`min-w-[110px] p-4 rounded-xl border border-gray-100 shadow-sm ${stat.bg}`}>
                                <h4 className={`text-xl font-extrabold ${stat.color}`}>{stat.val}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 4. EXPLORE GRID (The App Icons) --- */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-4 px-1">Explore</h3>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {apps.map((app, idx) => (
                            <Link to={app.link} key={idx} className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-100">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${app.color}`}>
                                    {app.icon === 'briefcase' ? <Layers size={24} className="text-pink-600" /> : app.icon}
                                </div>
                                <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">
                                    {app.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- 5. LIVE ACTIVITY (List) --- */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Recent Activity</h3>
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3 items-center border-b border-gray-50 pb-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <span className="font-bold text-xs">₹</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-800">Fees Received</h4>
                                <p className="text-xs text-gray-500">Rohan (Class 10) paid ₹5,000</p>
                            </div>
                            <span className="text-[10px] text-gray-400">2m ago</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <User size={18} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-800">New Admission</h4>
                                <p className="text-xs text-gray-500">Amit Kumar added to Class 5</p>
                            </div>
                            <span className="text-[10px] text-gray-400">1h ago</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- 6. FIXED BOTTOM NAVIGATION (App Essential) --- */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-40 pb-safe">
                <div className="flex flex-col items-center gap-1 text-indigo-600">
                    <Home size={24} fill="currentColor" className="opacity-100" />
                    <span className="text-[10px] font-bold">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition">
                    <PlayCircle size={24} />
                    <span className="text-[10px] font-medium">Classes</span>
                </div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 p-3 rounded-full shadow-lg shadow-indigo-300 border-4 border-slate-50 cursor-pointer active:scale-90 transition">
                    <ShoppingBag size={24} className="text-white" />
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition ml-8">
                    <Calendar size={24} />
                    <span className="text-[10px] font-medium">Events</span>
                </div>
                <Link to="/school/settings" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition">
                    <User size={24} />
                    <span className="text-[10px] font-medium">Profile</span>
                </Link>
            </div>

        </div>
    );
};

export default SchoolDashboard;