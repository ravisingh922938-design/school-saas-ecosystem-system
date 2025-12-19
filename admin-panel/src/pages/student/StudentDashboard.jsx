import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Book, CreditCard, Calendar, FileText, Bus, Trophy,
    QrCode, Video, Download, Bot, PlayCircle, AlertCircle,
    Award, TrendingUp, ChevronRight
} from 'lucide-react';

// Graph Component Import
import StudentAttendanceGraph from './StudentAttendanceGraph';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentDashboard = () => {
    const [latestNotice, setLatestNotice] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [user, setUser] = useState({ name: 'Student', enrollmentId: 'ID-000' });

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Get User Info
                const userStr = localStorage.getItem('user');
                const userData = userStr ? JSON.parse(userStr) : {};
                setUser(userData);

                const schoolId = userData.schoolId || 'DPS';
                const studentId = userData.enrollmentId || 'DPS-S01';

                // 2. Fetch Notice & Attendance Parallelly
                const [noticeRes, attRes] = await Promise.all([
                    axios.get(`${API_URL}/school-data/notice/${schoolId}`).catch(e => ({ data: { success: false } })),
                    axios.get(`${API_URL}/attendance/${schoolId}/${studentId}`).catch(e => ({ data: { success: false } }))
                ]);

                // Set Notice
                if (noticeRes.data.success && noticeRes.data.data.length > 0) {
                    setLatestNotice(noticeRes.data.data[0]);
                }

                // Set Attendance Data (Real or Fallback)
                if (attRes.data.success && attRes.data.data.length > 0) {
                    // Real Data Logic (Backend se count calculate karna padega)
                    // Abhi ke liye hum Static Data dikha rahe hain taaki Graph khali na dikhe
                    setAttendanceData([
                        { name: 'Aug', present: 22, total: 26 },
                        { name: 'Sep', present: 24, total: 25 },
                        { name: 'Oct', present: attRes.data.data.length || 20, total: 24 }
                    ]);
                } else {
                    // Default Data for Demo
                    setAttendanceData([
                        { name: 'Aug', present: 18, total: 24 },
                        { name: 'Sep', present: 20, total: 24 },
                        { name: 'Oct', present: 22, total: 24 }
                    ]);
                }

            } catch (err) { console.error(err); }
        };
        fetchData();
    }, []);

    // --- ALL 10 FEATURES GRID ---
    const features = [
        { name: "Live Class", icon: <Video size={24} />, color: "text-red-600", bg: "bg-red-50", link: "/student/lms" },
        { name: "Notes", icon: <Download size={24} />, color: "text-blue-600", bg: "bg-blue-50", link: "/student/materials" },
        { name: "Results", icon: <Award size={24} />, color: "text-purple-600", bg: "bg-purple-50", link: "/student/results" },
        { name: "Homework", icon: <Book size={24} />, color: "text-indigo-600", bg: "bg-indigo-50", link: "/student/academics" },
        { name: "AI Tutor", icon: <Bot size={24} />, color: "text-emerald-600", bg: "bg-emerald-50", link: "/student/ai-tutor" },
        { name: "Test Series", icon: <FileText size={24} />, color: "text-pink-600", bg: "bg-pink-50", link: "/student/test" },
        { name: "Time Table", icon: <Calendar size={24} />, color: "text-orange-600", bg: "bg-orange-50", link: "/student/timetable" },
        { name: "Bus Track", icon: <Bus size={24} />, color: "text-yellow-600", bg: "bg-yellow-50", link: "/student/transport" },
        { name: "ID Card", icon: <QrCode size={24} />, color: "text-gray-600", bg: "bg-gray-100", link: "/student/id-card" },
        { name: "Fees", icon: <CreditCard size={24} />, color: "text-teal-600", bg: "bg-teal-50", link: "/student/fees" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans pb-10">

            {/* 1. LIVE NOTICE BANNER */}
            {latestNotice && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm mx-1 flex gap-3 items-start">
                    <AlertCircle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-widest mb-1">NOTICE BOARD</p>
                        <h4 className="font-bold text-gray-800 text-sm">{latestNotice.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{latestNotice.description}</p>
                    </div>
                </div>
            )}

            {/* 2. CONTINUE LEARNING (Hero Section) */}
            <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">RESUME LEARNING</p>
                        <h3 className="text-lg font-bold">Physics: Laws of Motion</h3>
                        <p className="text-xs text-gray-400">Chapter 4 • Lecture 03</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-md animate-pulse">
                        <PlayCircle size={24} className="text-white" />
                    </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>

                <Link to="/student/lms">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition">
                        Continue Watching
                    </button>
                </Link>
            </div>

            {/* 3. EXPLORE APPS GRID (All 10 Icons) */}
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-4 px-1 flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div> Quick Actions
                </h3>
                <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                    {features.map((item, idx) => (
                        <Link to={item.link} key={idx} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-sm border border-gray-50`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 4. ATTENDANCE & PERFORMANCE GRAPH */}
            <div className="border-t border-gray-100 pt-4">
                <StudentAttendanceGraph graphData={attendanceData} />
            </div>

            {/* 5. FEE ALERT CARD */}
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2.5 rounded-full text-red-600"><CreditCard size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">Fee Pending</h4>
                        <p className="text-xs text-red-500 font-bold">₹ 2,500 Due</p>
                    </div>
                </div>
                <Link to="/student/fees">
                    <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md active:scale-95 transition">
                        Pay Now
                    </button>
                </Link>
            </div>

            {/* 6. TODAY'S SCHEDULE */}
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