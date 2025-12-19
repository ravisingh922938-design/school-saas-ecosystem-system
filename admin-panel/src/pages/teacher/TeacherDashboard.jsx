import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// 👇 Yahan 'Home' aur 'Search' add kar diya hai
import {
    Bell, Search, CheckSquare, BookOpen, ClipboardList, Calendar,
    Users, Image, Megaphone, Video, Briefcase, Sparkles,
    Star, User, Clock, ChevronRight, Home
} from 'lucide-react';

const TeacherDashboard = () => {
    const [user, setUser] = useState({ name: 'Teacher', employeeId: 'T-000' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    // --- 🔥 ALL 12 POWERFUL FEATURES ---
    const allApps = [
        // 1. Core Teaching
        { name: "Attendance", icon: <CheckSquare size={26} />, color: "text-teal-600", bg: "bg-teal-50", link: "/teacher/attendance" },
        { name: "Smart Class", icon: <Video size={26} />, color: "text-red-600", bg: "bg-red-50", link: "/teacher/lms" }, // Link Fixed
        { name: "AI Paper Gen", icon: <Sparkles size={26} />, color: "text-violet-600", bg: "bg-violet-50", link: "/teacher/paper-gen" },
        { name: "Homework", icon: <BookOpen size={26} />, color: "text-blue-600", bg: "bg-blue-50", link: "/teacher/homework" },

        // 2. Management
        { name: "Marks Entry", icon: <ClipboardList size={26} />, color: "text-purple-600", bg: "bg-purple-50", link: "/teacher/marks" },
        { name: "Time Table", icon: <Calendar size={26} />, color: "text-indigo-600", bg: "bg-indigo-50", link: "/teacher/timetable" },
        { name: "Students", icon: <Users size={26} />, color: "text-orange-600", bg: "bg-orange-50", link: "/teacher/students" },
        { name: "Remarks", icon: <Star size={26} />, color: "text-yellow-600", bg: "bg-yellow-50", link: "/teacher/remarks" },

        // 3. Extras
        { name: "Gallery", icon: <Image size={26} />, color: "text-pink-600", bg: "bg-pink-50", link: "/teacher/gallery" },
        { name: "Notices", icon: <Megaphone size={26} />, color: "text-gray-600", bg: "bg-gray-100", link: "/teacher/notices" },
        { name: "Apply Leave", icon: <Briefcase size={26} />, color: "text-cyan-600", bg: "bg-cyan-50", link: "/teacher/leaves" },
        { name: "Profile", icon: <User size={26} />, color: "text-slate-600", bg: "bg-slate-200", link: "/teacher/profile" },
        { name: "Marks Entry", icon: <ClipboardList size={26} />, color: "text-purple-600", bg: "bg-purple-50", link: "/teacher/marks" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans select-none">

            {/* --- 1. HEADER --- */}
            <div className="bg-white px-5 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-teal-100">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 leading-tight">Hi, {user.name} 👋</h1>
                        <p className="text-[10px] text-gray-500 font-medium">ID: {user.employeeId || 'T-2025'}</p>
                    </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-full text-gray-600 relative hover:bg-gray-100 transition active:scale-95 cursor-pointer">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </div>
            </div>

            <div className="p-5 space-y-6">

                {/* --- 2. HERO: NEXT CLASS --- */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-5 text-white shadow-xl shadow-teal-200 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                        <Clock size={120} />
                    </div>
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-1">UPCOMING CLASS</p>
                            <h2 className="text-2xl font-bold mb-1">Class 10-A</h2>
                            <p className="text-sm text-teal-100 opacity-90">Mathematics • Room 101</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl text-center min-w-[70px]">
                            <span className="block text-xs font-bold text-teal-50">Starts in</span>
                            <span className="block text-xl font-black">10m</span>
                        </div>
                    </div>
                </div>

                {/* --- 3. ALL FEATURES GRID --- */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-4 px-1 text-sm flex justify-between items-center">
                        <span>Teacher Tools</span>
                        <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded-full">{allApps.length} Apps</span>
                    </h3>

                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {allApps.map((app, idx) => (
                            <Link to={app.link} key={idx} className="flex flex-col items-center gap-2 active:scale-90 transition-transform duration-200 group">
                                <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shadow-sm border border-gray-100 ${app.bg} ${app.color} group-hover:shadow-md transition`}>
                                    {app.icon}
                                </div>
                                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                                    {app.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- 4. TIMELINE --- */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800 text-sm">Today's Schedule</h3>
                        <Link to="/teacher/timetable" className="text-xs text-teal-600 font-bold flex items-center">View All <ChevronRight size={14} /></Link>
                    </div>
                    <div className="space-y-4 pl-2">
                        {[
                            { time: "09:00", sub: "Maths (10-A)", status: "Completed", color: "border-teal-500" },
                            { time: "11:00", sub: "Physics (9-B)", status: "Up Next", color: "border-blue-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-xs font-bold text-gray-400 w-10 pt-1">{item.time}</span>
                                <div className={`flex-1 p-3 rounded-xl bg-gray-50 border-l-4 ${item.color}`}>
                                    <h4 className="text-sm font-bold text-gray-800">{item.sub}</h4>
                                    <p className="text-[10px] text-gray-500">{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- 5. BOTTOM NAVIGATION --- */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-40 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col items-center gap-1 text-teal-600 cursor-pointer">
                    <Home size={24} fill="currentColor" className="opacity-100" />
                    <span className="text-[10px] font-bold">Home</span>
                </div>

                {/* Smart Class Button */}
                <Link to="/teacher/lms" className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-600 transition cursor-pointer active:scale-95">
                    <Video size={24} />
                    <span className="text-[10px] font-medium">Live</span>
                </Link>

                {/* Center Action Button */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-teal-600 p-3.5 rounded-full shadow-lg shadow-teal-300 border-[6px] border-slate-50 cursor-pointer active:scale-90 transition">
                    <Link to="/teacher/attendance">
                        <CheckSquare size={24} className="text-white" />
                    </Link>
                </div>

                {/* Paper Gen Button */}
                <Link to="/teacher/paper-gen" className="flex flex-col items-center gap-1 text-gray-400 hover:text-violet-600 transition cursor-pointer ml-8 active:scale-95">
                    <Sparkles size={24} />
                    <span className="text-[10px] font-medium">AI Paper</span>
                </Link>
                <Link to="/teacher/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition cursor-pointer active:scale-95">
                    <User size={24} />
                    <span className="text-[10px] font-medium">Profile</span>
                </Link>
            </div>

        </div>
    );
};

export default TeacherDashboard;