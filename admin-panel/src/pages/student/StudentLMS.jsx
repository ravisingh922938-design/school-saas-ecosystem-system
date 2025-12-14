import React, { useState } from 'react';
import { Play, Clock, Calendar, Users, ChevronRight, Bell } from 'lucide-react';

const StudentLMS = () => {
    const [activeTab, setActiveTab] = useState('live');

    // --- 🔴 LIVE CLASSES DATA (Rich Thumbnails) ---
    const liveClasses = [
        {
            id: 1,
            subject: "Physics",
            topic: "Rotational Motion - L03",
            teacher: "R.K. Mishra",
            time: "LIVE NOW",
            students: "1.2k watching",
            color: "from-purple-600 to-indigo-700", // Gradient Background
            teacherImg: "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-indian-teacher-clipart-png-image_12531393.png" // Dummy Teacher Cutout
        },
        {
            id: 2,
            subject: "Maths",
            topic: "Calculus: Integration",
            teacher: "S. Gupta",
            time: "Starts in 10m",
            students: "Waiting...",
            color: "from-blue-600 to-cyan-600",
            teacherImg: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-teacher-png-image_10149653.png"
        }
    ];

    // --- 📅 UPCOMING DATA ---
    const upcomingClasses = [
        { sub: "Chemistry", topic: "Organic Reactions", time: "Tomorrow, 10 AM", teacher: "A. Singh" },
        { sub: "English", topic: "Literature: Poetry", time: "Tomorrow, 12 PM", teacher: "Ms. Das" }
    ];

    return (
        <div className="pb-24 bg-slate-50 min-h-screen font-sans">

            {/* 1. Header */}
            <div className="bg-white p-4 sticky top-0 z-20 shadow-sm flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-gray-800">My Classes 📺</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('live')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${activeTab === 'live' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                    >
                        Live
                    </button>
                    <button
                        onClick={() => setActiveTab('recorded')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${activeTab === 'recorded' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                    >
                        Recorded
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* --- 2. HERO LIVE CARDS (Unacademy Style) --- */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Happening Now</h3>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {liveClasses.map((item) => (
                            <div key={item.id} className="snap-center min-w-[300px] w-[85%] relative bg-white rounded-3xl shadow-xl overflow-hidden active:scale-95 transition-transform duration-200 cursor-pointer">

                                {/* Upper Gradient Thumbnail */}
                                <div className={`h-40 bg-gradient-to-r ${item.color} relative p-5`}>
                                    {/* Live Badge */}
                                    <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {item.time}
                                    </div>

                                    {/* Subject Badge */}
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-white/30">
                                        {item.subject}
                                    </div>

                                    {/* Teacher Image (Cutout Effect) */}
                                    <img
                                        src={item.teacherImg}
                                        className="absolute bottom-0 right-2 w-32 h-36 object-contain drop-shadow-2xl filter brightness-110"
                                        alt="Teacher"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full border border-white/50">
                                            <Play size={24} fill="white" className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Lower Info Section */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 line-clamp-1">
                                        {item.topic}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                                        👨‍🏫 by <span className="font-semibold text-gray-700">{item.teacher}</span>
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <Users size={12} /> {item.students}
                                        </span>
                                        <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-gray-300">
                                            Join Class
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 3. UPCOMING CLASSES (List View) --- */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold text-gray-800">Upcoming Schedule</h3>
                        <span className="text-xs text-indigo-600 font-bold">See Calendar</span>
                    </div>

                    <div className="space-y-3">
                        {upcomingClasses.map((cls, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                {/* Date Box */}
                                <div className="bg-orange-50 text-orange-600 p-3 rounded-xl flex flex-col items-center justify-center min-w-[60px]">
                                    <Calendar size={18} className="mb-1" />
                                    <span className="text-[10px] font-bold">TMRW</span>
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-800">{cls.sub}: {cls.topic}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{cls.time} • {cls.teacher}</p>
                                </div>

                                {/* Notify Button */}
                                <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                                    <Bell size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 4. RECORDED VIDEOS (Grid View) --- */}
                {activeTab === 'recorded' && (
                    <div className="mt-6 animate-in fade-in zoom-in duration-300">
                        <h3 className="text-sm font-bold text-gray-800 mb-3">Previous Lectures</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                    {/* Thumbnail */}
                                    <div className="h-24 bg-gray-800 relative">
                                        <img src={`https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg`} className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play size={20} className="text-white fill-white" />
                                        </div>
                                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded">45:00</span>
                                    </div>
                                    {/* Info */}
                                    <div className="p-3">
                                        <h4 className="text-xs font-bold text-gray-800 line-clamp-2">Complete Trigonometry in One Shot</h4>
                                        <p className="text-[10px] text-gray-500 mt-1">Maths • 2 days ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default StudentLMS;