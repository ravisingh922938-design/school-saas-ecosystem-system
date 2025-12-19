import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Calendar, Pin, AlertCircle, Megaphone } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    // User Data nikalo
    const user = JSON.parse(localStorage.getItem('user'));
    // Fallback: Agar schoolId nahi mila to 'DPS' maan lo (Testing ke liye)
    const schoolId = user?.schoolId || 'DPS';

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                console.log(`📡 Fetching notices for School ID: ${schoolId}`); // Debug Log

                const res = await axios.get(`${API_URL}/school-data/notice/${schoolId}`);

                if (res.data.success) {
                    console.log("✅ Notices Found:", res.data.data);
                    setNotices(res.data.data);
                }
            } catch (err) {
                console.error("❌ Error fetching notices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, [schoolId]);

    return (
        <div className="p-5 pb-24 min-h-screen bg-slate-50 font-sans select-none">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Notice Board 📢</h2>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">School Updates</p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
                    <Bell size={20} className="text-gray-600" />
                </div>
            </div>

            {/* Loading State */}
            {loading && <p className="text-center text-gray-400 mt-10">Loading updates...</p>}

            {/* Empty State */}
            {!loading && notices.length === 0 && (
                <div className="text-center mt-10 opacity-50">
                    <Megaphone size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No notices posted yet.</p>
                    <p className="text-xs text-gray-400">School ID: {schoolId}</p>
                </div>
            )}

            {/* List */}
            <div className="space-y-4">
                {notices.map((notice) => (
                    <div key={notice._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition">

                        {/* Priority Strip */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${notice.type === 'Urgent' ? 'bg-red-500' :
                            notice.type === 'Event' ? 'bg-orange-500' : 'bg-blue-500'
                            }`}></div>

                        <div className="flex justify-between items-start mb-2 pl-3">
                            <div>
                                {notice.type === 'Urgent' && (
                                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit mb-1">
                                        <AlertCircle size={10} /> URGENT
                                    </span>
                                )}
                                <h3 className="font-bold text-lg text-gray-800 leading-tight">{notice.title}</h3>
                            </div>
                            <Pin size={16} className="text-gray-300 transform rotate-45" />
                        </div>

                        <p className="text-sm text-gray-600 pl-3 leading-relaxed mb-3">{notice.description}</p>

                        <div className="flex items-center gap-2 pl-3 pt-3 border-t border-gray-50">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-400 font-medium">
                                {new Date(notice.date).toDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TeacherNotices;