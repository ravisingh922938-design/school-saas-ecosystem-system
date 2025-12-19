import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Calendar } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherNotices = () => {
    const [notices, setNotices] = useState([]);

    // Teacher ke User data se School ID lo
    const user = JSON.parse(localStorage.getItem('user'));
    const schoolId = user?.schoolId || 'DPS';

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axios.get(`${API_URL}/school-data/notice/${schoolId}`);
                if (res.data.success) setNotices(res.data.data);
            } catch (err) { console.error(err); }
        };
        fetchNotices();
    }, []);

    return (
        <div className="p-5 pb-24 min-h-screen bg-slate-50">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Notice Board 📢</h2>

            <div className="space-y-4">
                {notices.length === 0 ? <p>No notices yet.</p> : notices.map((notice) => (
                    <div key={notice._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800">{notice.title}</h3>
                            {notice.type === 'Urgent' && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold">URGENT</span>}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{notice.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 w-fit px-2 py-1 rounded-md">
                            <Calendar size={12} /> {new Date(notice.date).toDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherNotices;