import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Mail, Phone, BookOpen, Trash2 } from 'lucide-react';

const TeacherManager = () => {
    const [teachers, setTeachers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', subject: '', password: ''
    });

    // 1. Fetch Teachers on Load
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/teachers');
            setTeachers(data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    // 2. Handle Add Teacher
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/teachers/add', formData);
            alert('Teacher Added Successfully! 🎉');
            setShowModal(false);
            setFormData({ name: '', email: '', phone: '', subject: '', password: '' }); // Reset Form
            fetchTeachers(); // Refresh List
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding teacher');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
                    <p className="text-gray-500 text-sm">Manage your school teachers</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={18} /> Add Teacher
                </button>
            </div>

            {/* Teacher List (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((teacher) => (
                    <div key={teacher._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                {teacher.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{teacher.name}</h3>
                                <p className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                                    {teacher.subject || "General"} Teacher
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><Mail size={16} /> {teacher.email}</div>
                            <div className="flex items-center gap-2"><Phone size={16} /> {teacher.phone}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- ADD TEACHER MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Add New Teacher</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" required
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />

                            <input type="email" placeholder="Email (Login ID)" className="w-full p-3 border rounded-lg" required
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />

                            <input type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg" required
                                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />

                            <input type="text" placeholder="Subject (e.g. Math)" className="w-full p-3 border rounded-lg" required
                                value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />

                            <input type="password" placeholder="Create Password" className="w-full p-3 border rounded-lg" required
                                value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />

                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                    {loading ? 'Saving...' : 'Add Teacher'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherManager;