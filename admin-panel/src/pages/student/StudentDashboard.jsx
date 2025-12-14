import React from 'react';
import {
    Book, CreditCard, Clock, ChevronRight,
    Calendar, FileText, Bus, Star, AlertCircle
} from 'lucide-react';

const StudentDashboard = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* 1. FEE ALERT CARD (Gradient & 3D Feel) */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 rounded-[1.5rem] text-white shadow-xl shadow-red-200 relative overflow-hidden active:scale-[0.98] transition duration-200">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-10 -mb-10 blur-xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-red-700/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <AlertCircle size={12} /> Overdue
                        </span>
                        <p className="text-xs text-red-100 font-medium">Due: 15 Oct</p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-red-100 text-xs mb-1">Total Pending</p>
                            <h2 className="text-4xl font-black tracking-tight">₹ 2,500</h2>
                        </div>
                        <button className="bg-white text-red-600 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg active:scale-90 transition transform">
                            PAY NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. QUICK ACTIONS (App Grid) */}
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-4 px-1">Quick Access</h3>
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { name: "Homework", icon: <Book size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
                        { name: "Time Table", icon: <Calendar size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
                        { name: "Bus", icon: <Bus size={20} />, color: "text-yellow-600", bg: "bg-yellow-50" },
                        { name: "Result", icon: <Star size={20} />, color: "text-green-600", bg: "bg-green-50" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-[18px] flex items-center justify-center shadow-sm border border-gray-100`}>
                                {item.icon}
                            </div>
                            <span className="text-[11px] font-medium text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. HOMEWORK LIST (Cards) */}
            <div>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className="font-bold text-gray-800 text-sm">Pending Homework</h3>
                    <span className="text-orange-600 text-xs font-bold flex items-center bg-orange-50 px-2 py-1 rounded-md active:bg-orange-100 transition">See All <ChevronRight size={14} /></span>
                </div>

                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center active:bg-gray-50 transition">
                        <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><FileText size={20} /></div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm">Math Exercise 4.2</h4>
                            <p className="text-xs text-gray-400 mt-0.5 font-medium">Algebra • Due Tomorrow</p>
                        </div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center active:bg-gray-50 transition">
                        <div className="bg-green-50 p-3 rounded-2xl text-green-600"><FileText size={20} /></div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm">Science Project</h4>
                            <p className="text-xs text-gray-400 mt-0.5 font-medium">Physics • Due in 2 Days</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. TODAY'S CLASSES (Horizontal Scroll) */}
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-3 px-1">Today's Classes</h3>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {[
                        { sub: "English", time: "09:00 AM", room: "101", color: "bg-indigo-50 text-indigo-600" },
                        { sub: "Maths", time: "10:30 AM", room: "Lab", color: "bg-orange-50 text-orange-600" },
                        { sub: "History", time: "12:00 PM", room: "102", color: "bg-rose-50 text-rose-600" }
                    ].map((cls, i) => (
                        <div key={i} className={`min-w-[120px] p-4 rounded-2xl border border-gray-100 shadow-sm ${cls.color} bg-opacity-50 flex flex-col justify-between h-28`}>
                            <span className="text-[10px] font-bold bg-white/60 px-2 py-1 rounded-md w-fit backdrop-blur-sm">{cls.time}</span>
                            <div>
                                <h4 className="font-bold text-sm">{cls.sub}</h4>
                                <p className="text-[10px] opacity-70">Room {cls.room}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default StudentDashboard;