import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone, Plus, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SchoolNotices = () => {
    const [notices, setNotices] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', type: 'General' });

    // User Data se School ID nikalo
    const user = JSON.parse(localStorage.getItem('user'));
    const schoolId = user?.schoolId || 'DPS';

    // 1. Fetch Notices (Load hote hi)
    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await axios.get(`${API_URL}/school-data/notice/${schoolId}`);
            if (res.data.success) setNotices(res.data.data);
        } catch (err) { console.error(err); }
    };

    // 2. Create Notice
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/school-data/notice/add`, { ...formData, schoolId });
            alert("Notice Posted Successfully!");
            setFormData({ title: '', description: '', type: 'General' });
            fetchNotices(); // List refresh karo
        } catch (err) { alert("Failed to post"); }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Megaphone /> Notice Board</h2>

            {/* Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
                <h3 className="font-bold mb-4">Create New Notice</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title (e.g. Holiday Tomorrow)" className="w-full p-3 border rounded-xl" required
                        value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <textarea placeholder="Description..." className="w-full p-3 border rounded-xl" required
                        value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    <div className="flex justify-between items-center">
                        <select className="p-3 border rounded-xl" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                            <option>General</option>
                            <option>Urgent</option>
                        </select>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Post Notice</button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                {notices.map((notice) => (
                    <div key={notice._id} className="bg-white p-4 rounded-xl border border-l-4 border-l-blue-500 shadow-sm">
                        <h4 className="font-bold text-lg">{notice.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{notice.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(notice.date).toDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchoolNotices;