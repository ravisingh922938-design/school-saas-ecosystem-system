import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Users, BookOpen, IndianRupee, Bell, Search, Menu,
    UserPlus, CalendarCheck, Bus, Library, BedDouble,
    ShoppingBag, FileText, Settings, Briefcase, Layers,
    ClipboardList, Megaphone
} from 'lucide-react';

const SchoolDashboard = () => {
    const [user, setUser] = useState({ name: 'Principal', schoolId: 'SCHOOL' });

    useEffect(() => {
        // LocalStorage se logged in user ka data nikalo
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // --- ALL 14 APP FEATURES ---
    const features = [
        { name: "Admission", icon: <UserPlus size={28} />, color: "text-blue-600", bg: "bg-blue-100", link: "/school/admission" },
        { name: "Students", icon: <Users size={28} />, color: "text-indigo-600", bg: "bg-indigo-100", link: "/school/students" },
        { name: "Staff / HR", icon: <Briefcase size={28} />, color: "text-pink-600", bg: "bg-pink-100", link: "/school/staff" },
        { name: "Attendance", icon: <CalendarCheck size={28} />, color: "text-green-600", bg: "bg-green-100", link: "/school/attendance" },
        { name: "Fees", icon: <IndianRupee size={28} />, color: "text-emerald-600", bg: "bg-emerald-100", link: "/school/finance" },
        { name: "Time Table", icon: <ClipboardList size={28} />, color: "text-orange-600", bg: "bg-orange-100", link: "/school/academics" },
        { name: "Exams", icon: <FileText size={28} />, color: "text-red-600", bg: "bg-red-100", link: "/school/exams" },
        { name: "Library", icon: <Library size={28} />, color: "text-teal-600", bg: "bg-teal-100", link: "/school/library" },
        { name: "Transport", icon: <Bus size={28} />, color: "text-yellow-600", bg: "bg-yellow-100", link: "/school/transport" },
        { name: "Hostel", icon: <BedDouble size={28} />, color: "text-purple-600", bg: "bg-purple-100", link: "/school/hostel" },
        { name: "Inventory", icon: <Layers size={28} />, color: "text-cyan-600", bg: "bg-cyan-100", link: "/school/inventory" },
        { name: "Notice Board", icon: <Megaphone size={28} />, color: "text-rose-600", bg: "bg-rose-100", link: "/school/notices" },
        { name: "School Store", icon: <ShoppingBag size={28} />, color: "text-blue-800", bg: "bg-blue-200", link: "/school/store" },
        { name: "Settings", icon: <Settings size={28} />, color: "text-gray-600", bg: "bg-gray-200", link: "/school/settings" },
    ];

    return (
        // ✨ Colorful Gradient Background (Professional Look)
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans pb-10">

            {/* Top Header (Glass Effect) */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-sm border-b border-white/50">
                <div className="flex items-center gap-3">
                    <Menu className="text-indigo-600 md:hidden" />
                    <div>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                            {user.schoolId === 'DPS' ? 'Delhi Public School' : 'Galaxy International'}
                        </h1>
                        <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase bg-white/50 px-2 py-0.5 rounded-full inline-block">CODE: {user.schoolId}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex bg-white p-2.5 rounded-full text-indigo-500 shadow-sm border border-gray-100 hover:scale-105 transition"><Search size={20} /></div>
                    <div className="bg-white p-2.5 rounded-full relative text-indigo-600 shadow-sm border border-gray-100 cursor-pointer hover:scale-105 transition">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff`} className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-105 transition" alt="profile" />
                </div>
            </header>

            <div className="p-6 max-w-7xl mx-auto space-y-8">

                {/* 1. Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-800">Hello, {user.name} 👋</h2>
                        <p className="text-slate-500 font-medium">Here is what’s happening in your school today.</p>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition transform active:scale-95 flex items-center gap-2">
                        <UserPlus size={20} /> New Admission
                    </button>
                </div>

                {/* 2. Three Main Stats Cards (Gradient & Glassmorphism) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Students Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl shadow-blue-200 text-white relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition duration-500"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><Users size={24} /></div>
                            <span className="bg-white/20 text-xs px-2 py-1 rounded-lg font-bold">Total</span>
                        </div>
                        <div className="mt-4 relative z-10">
                            <h3 className="text-4xl font-black">1,240</h3>
                            <p className="text-blue-100 text-sm mt-1 font-medium">Active Students</p>
                        </div>
                    </div>

                    {/* Fees Card */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-2xl shadow-xl shadow-teal-200 text-white relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition duration-500"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><IndianRupee size={24} /></div>
                            <span className="bg-white/20 text-xs px-2 py-1 rounded-lg font-bold">+12%</span>
                        </div>
                        <div className="mt-4 relative z-10">
                            <h3 className="text-4xl font-black">₹ 4.5 L</h3>
                            <p className="text-emerald-100 text-sm mt-1 font-medium">Collected This Month</p>
                        </div>
                    </div>

                    {/* Staff Card */}
                    <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 rounded-2xl shadow-xl shadow-purple-200 text-white relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition duration-500"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><BookOpen size={24} /></div>
                            <span className="bg-white/20 text-xs px-2 py-1 rounded-lg font-bold">Today</span>
                        </div>
                        <div className="mt-4 relative z-10">
                            <h3 className="text-4xl font-black">96%</h3>
                            <p className="text-purple-100 text-sm mt-1 font-medium">Staff Attendance</p>
                        </div>
                    </div>
                </div>

                {/* 3. APP LAUNCHER GRID (Mobile Style Icons) */}
                <div>
                    <h3 className="text-slate-700 font-bold mb-6 flex items-center gap-2">
                        <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                        Modules & Apps
                    </h3>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
                        {features.map((item, index) => (
                            <Link to={item.link} key={index} className="group flex flex-col items-center text-center cursor-pointer">

                                {/* Big Icon Box (Squircle Shape) */}
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${item.bg} ${item.color} rounded-[1.5rem] flex items-center justify-center shadow-sm border border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:-translate-y-1`}>
                                    {item.icon}
                                </div>

                                {/* Name Below */}
                                <span className="mt-3 text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-indigo-700 transition-colors">
                                    {item.name}
                                </span>

                            </Link>
                        ))}
                    </div>
                </div>

                {/* 4. Widgets Grid (Defaulters & Birthdays) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fee Defaulters */}
                    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white hover:shadow-md transition">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div> Fee Defaulters
                            </h3>
                            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition">View All</button>
                        </div>
                        <ul className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <li key={i} className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">S{i}</div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Student {i}</p>
                                            <p className="text-xs text-gray-500">Class 10-A</p>
                                        </div>
                                    </div>
                                    <span className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-lg border border-red-100">₹ 5,000</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Birthdays */}
                    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white hover:shadow-md transition">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Today's Birthdays
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="text-center min-w-[90px] p-3 bg-white rounded-2xl border border-gray-100 hover:border-yellow-200 transition cursor-pointer">
                                    <div className="w-14 h-14 rounded-full mx-auto mb-2 p-1 border-2 border-dashed border-indigo-200">
                                        <img src={`https://ui-avatars.com/api/?name=Kid${i}&background=random`} className="w-full h-full rounded-full" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">Kid {i}</p>
                                    <button className="text-[10px] mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold shadow-sm hover:shadow-md transition">Wish 🎉</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SchoolDashboard;