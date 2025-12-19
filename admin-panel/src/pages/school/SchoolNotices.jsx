import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone, Send, Trash2, AlertCircle, Calendar, CheckCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SchoolNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'General'
    });

    // User Data se School ID nikalo
    const user = JSON.parse(localStorage.getItem('user'));
    const schoolId = user?.schoolId || 'DPS';

    // 1. Fetch Real Notices from Database
    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            // ✅ REAL API CALL
            const res = await axios.get(`${API_URL}/school-data/notice/${schoolId}`);
            if (res.data.success) {
                setNotices(res.data.data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    // 2. Post Real Notice to Database
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ✅ REAL API CALL
            await axios.post(`${API_URL}/school-data/notice/add`, { ...formData, schoolId });

            alert("✅ Notice Saved to Database!");
            setFormData({ title: '', description: '', type: 'General' }); // Reset Form
            fetchNotices(); // List ko refresh karein
        } catch (err) {
            console.error(err);
            alert("❌ Failed to post notice. Check Backend connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto pb-24 font-sans">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4 rounded-2xl text-white shadow-lg shadow-rose-200">
                    <Megaphone size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Communication Center</h1>
                    <p className="text-gray-500 font-medium">Broadcast updates to teachers & students.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORM */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-6">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
                            <Send size={20} className="text-blue-600" /> Compose Notice
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Headline</label>
                                <input type="text" placeholder="e.g. Holiday Tomorrow" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium" required
                                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Details</label>
                                <textarea rows="4" placeholder="Type your message here..." className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-medium" required
                                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Priority</label>
                                <select className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                    value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                    <option>General</option>
                                    <option>Urgent</option>
                                    <option>Event</option>
                                </select>
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition transform active:scale-95 flex justify-center items-center gap-2">
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Post Notice <CheckCircle size={18} /></>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* LIST */}
                <div className="lg:col-span-2">
                    <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                        Recent Announcements <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{notices.length}</span>
                    </h3>
                    <div className="space-y-4">
                        {notices.length === 0 ? <p className="text-gray-400 text-center py-10">No notices found.</p> : notices.map((notice) => (
                            <div key={notice._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition relative overflow-hidden">
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${notice.type === 'Urgent' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                <div className="flex justify-between items-start mb-3 pl-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            {notice.type === 'Urgent' && <AlertCircle size={14} className="text-red-500" />}
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${notice.type === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{notice.type}</span>
                                        </div>
                                        <h4 className="font-bold text-xl text-gray-800">{notice.title}</h4>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm pl-3 leading-relaxed mb-4">{notice.description}</p>
                                <div className="flex justify-between items-center pl-3 pt-4 border-t border-gray-50">
                                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                                        <Calendar size={14} /> {new Date(notice.date).toDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolNotices;