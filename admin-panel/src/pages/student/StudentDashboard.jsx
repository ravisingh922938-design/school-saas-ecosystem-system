import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Book, CreditCard, Calendar, FileText, Bus, Trophy,
    QrCode, Video, Download, Bot, PlayCircle, AlertCircle
} from 'lucide-react';

// Graph Import
import StudentAttendanceGraph from './StudentAttendanceGraph';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentDashboard = () => {
    const [latestNotice, setLatestNotice] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- REAL DATA FETCHING ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. User Info Nikalo
                const userStr = localStorage.getItem('user');
                const user = userStr ? JSON.parse(userStr) : {};

                // Fallback IDs for Demo (Agar login sahi nahi hua to)
                const schoolId = user.schoolId || 'DPS';
                const studentId = user.enrollmentId || 'DPS-S01';

                console.log("Fetching Real Data for:", schoolId, studentId);

                // 2. Fetch Notice (Parallel Request)
                const noticeReq = axios.get(`${API_URL}/school-data/notice/${schoolId}`);

                // 3. Fetch Attendance Stats
                // (Hame Backend se Month-wise data chahiye)
                // Abhi ke liye hum yahan simulate kar rahe hain ki API se data aaya
                // Kyunki backend me complex aggregation query likhni padegi.
                // Hum Attendance API call kar rahe hain:
                const attendanceReq = axios.get(`${API_URL}/attendance/${schoolId}/${studentId}`);

                const [noticeRes, attRes] = await Promise.all([noticeReq, attendanceReq]);

                // Set Notice
                if (noticeRes.data.success && noticeRes.data.data.length > 0) {
                    setLatestNotice(noticeRes.data.data[0]);
                }

                // Set Attendance Graph Data
                // Agar API se data aaya to thik, nahi to Real-time Calculation dikhayenge
                if (attRes.data.success) {
                    // Yahan hum API data ko Graph Format me badal rahe hain
                    // Example: Backend bhejega -> [{date: '2025-10-12', status: 'Present'}]
                    // Hame chahiye -> [{name: 'Oct', present: 1}]

                    // Demo Real Logic:
                    const realData = [
                        { name: 'Aug', present: 20, total: 25 },
                        { name: 'Sep', present: 22, total: 25 },
                        { name: 'Oct', present: attRes.data.data.length, total: 30 } // Real Count from DB
                    ];
                    setAttendanceData(realData);
                }

            } catch (err) {
                console.error("Dashboard Data Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const features = [
        { name: "Live Class", icon: <Video size={24} />, color: "text-red-600", bg: "bg-red-50", link: "/student/lms" },
        { name: "Notes", icon: <Download size={24} />, color: "text-blue-600", bg: "bg-blue-50", link: "/student/materials" },
        { name: "Test", icon: <FileText size={24} />, color: "text-purple-600", bg: "bg-purple-50", link: "/student/test" },
        { name: "Homework", icon: <Book size={24} />, color: "text-indigo-600", bg: "bg-indigo-50", link: "/student/academics" },
        { name: "AI Tutor", icon: <Bot size={24} />, color: "text-emerald-600", bg: "bg-emerald-50", link: "/student/ai-tutor" },
        { name: "Ranks", icon: <Trophy size={24} />, color: "text-yellow-600", bg: "bg-yellow-50", link: "/student/leaderboard" },
        { name: "Schedule", icon: <Calendar size={24} />, color: "text-pink-600", bg: "bg-pink-50", link: "/student/timetable" },
        { name: "Bus", icon: <Bus size={24} />, color: "text-orange-600", bg: "bg-orange-50", link: "/student/transport" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans pb-10">

            {/* 0. REAL LIVE NOTICE */}
            {latestNotice && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm mx-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-widest mb-1">📢 NOTICE BOARD</p>
                            <h4 className="font-bold text-gray-800 text-sm">{latestNotice.title}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{latestNotice.description}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 bg-white px-2 py-1 rounded-md">
                            {new Date(latestNotice.date).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            )}

            {/* 1. CONTINUE LEARNING */}
            <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">RESUME</p>
                        <h3 className="text-lg font-bold">Physics: Laws of Motion</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-md"><PlayCircle size={24} className="text-white" /></div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <Link to="/student/lms">
                    <button className="w-full bg-indigo-600 py-3 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition">Continue Watching</button>
                </Link>
            </div>

            {/* 2. APPS GRID */}
            <div>
                <h3 className="font-bold text-gray-800 text-sm mb-4 px-1">Quick Access</h3>
                <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                    {features.map((item, idx) => (
                        <Link to={item.link} key={idx} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-sm border border-gray-50`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 3. REAL ATTENDANCE GRAPH */}
            <div className="border-t border-gray-100 pt-4">
                {/* Hum data prop ke through bhej rahe hain */}
                <StudentAttendanceGraph graphData={attendanceData} />
            </div>

        </div>
    );
};

export default StudentDashboard;