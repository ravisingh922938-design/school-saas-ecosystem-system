import React from 'react';
import { Link } from 'react-router-dom';
import {
    Book, CreditCard, Clock, ChevronRight,
    Calendar, FileText, Bus, Star, AlertCircle,
    Video, Download, Bot, Trophy, QrCode, PlayCircle
} from 'lucide-react';
import StudentAttendanceGraph from './StudentAttendanceGraph';

const StudentDashboard = () => {

    // --- ALL FEATURES GRID ---
    const features = [
        { name: "Live Classes", icon: <Video size={24} />, color: "text-red-600", bg: "bg-red-50", link: "/student/lms" },
        { name: "Study Material", icon: <Download size={24} />, color: "text-blue-600", bg: "bg-blue-50", link: "/student/materials" },
        { name: "Online Test", icon: <FileText size={24} />, color: "text-purple-600", bg: "bg-purple-50", link: "/student/test" },
        { name: "Homework", icon: <Book size={24} />, color: "text-indigo-600", bg: "bg-indigo-50", link: "/student/academics" },
        { name: "AI Tutor", icon: <Bot size={24} />, color: "text-emerald-600", bg: "bg-emerald-50", link: "/student/ai-tutor" },
        { name: "Leaderboard", icon: <Trophy size={24} />, color: "text-yellow-600", bg: "bg-yellow-50", link: "/student/leaderboard" },
        { name: "Time Table", icon: <Calendar size={24} />, color: "text-pink-600", bg: "bg-pink-50", link: "/student/timetable" },
        { name: "ID Card", icon: <QrCode size={24} />, color: "text-gray-600", bg: "bg-gray-100", link: "/student/id-card" },
        { name: "Bus Track", icon: <Bus size={24} />, color: "text-orange-600", bg: "bg-orange-50", link: "/student/transport" },
        { name: "Fees", icon: <CreditCard size={24} />, color: "text-teal-600", bg: "bg-teal-50", link: "/student/fees" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans pb-6">

            {/* 1. CONTINUE LEARNING (Course Card like Udemy/PW) */}
            <div className="bg-gray-900 rounded-[1.5rem] p-5 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">RESUME LEARNING</p>
                        <h3 className="text-lg font-bold">Physics: Laws of Motion</h3>
                        <p className="text-xs text-gray-400">Chapter 4 • Lecture 03</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                        <PlayCircle size={24} className="text-white" />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative z-10">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-indigo-300">Progress</span>
                        <span className="font-bold">75%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <Link to="/student/lms">
                        <button className="w-full mt-4 bg-indigo-600 py-2.5 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition">
                            Continue Watching
                        </button>
                    </Link>
                </div>
            </div>

            {/* 2. ALL FEATURES GRID (4 Columns) */}
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-4 px-1">Explore SchoolOS</h3>
                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                    {features.map((item, idx) => (
                        <Link to={item.link} key={idx} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-[20px] flex items-center justify-center shadow-sm border border-gray-50`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 3. FEE ALERT (Compact) */}
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">Fee Pending</h4>
                        <p className="text-xs text-red-500 font-bold">₹ 2,500 Due</p>
                    </div>
                </div>
                <Link to="/student/fees">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md active:scale-95 transition">
                        Pay Now
                    </button>
                </Link>
            </div>
            {/* ... (Features Grid ke niche) ... */}

            {/* 3. ATTENDANCE GRAPH (New Added) */}
            <StudentAttendanceGraph />

            {/* 4. FEE ALERT (Compact) ... */}

            {/* 4. UPCOMING CLASSES (Horizontal Scroll) */}
            <div>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className="font-bold text-gray-800 text-sm">Today's Schedule</h3>
                    <Link to="/student/timetable" className="text-indigo-600 text-xs font-bold">View All</Link>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {[
                        { sub: "English", time: "09:00 AM", room: "101", color: "bg-blue-50 text-blue-600" },
                        { sub: "Maths", time: "10:30 AM", room: "Lab", color: "bg-orange-50 text-orange-600" },
                        { sub: "History", time: "12:00 PM", room: "102", color: "bg-rose-50 text-rose-600" }
                    ].map((cls, i) => (
                        <div key={i} className={`min-w-[120px] p-4 rounded-2xl border border-gray-100 shadow-sm ${cls.color} bg-opacity-50 flex flex-col justify-between h-24`}>
                            <span className="text-[10px] font-bold bg-white/80 px-2 py-1 rounded-md w-fit backdrop-blur-sm">{cls.time}</span>
                            <div>
                                <h4 className="font-bold text-sm">{cls.sub}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default StudentDashboard;