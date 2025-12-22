import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Search, Trash2, Edit, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentManager = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '', rollNo: '', classId: '', section: '', fatherName: '', phone: ''
    });

    // Get User from LocalStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const schoolId = user?.schoolId || 'DPS'; // Fallback for demo

    // ✅ 1. Fetch Students (Fixed API Call)
    const fetchStudents = async () => {
        try {
            console.log("Fetching students for:", schoolId);
            // Correct Route: /students/all
            const res = await axios.get(`${API_URL}/students/all`, {
                params: { schoolId }
            });

            if (res.data.success) {
                setStudents(res.data.data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        if (schoolId) fetchStudents();
    }, [schoolId]);

    // ✅ 2. Add Student
    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Correct Route: /students/add
            await axios.post(`${API_URL}/students/add`, { ...formData, schoolId });

            alert("✅ Student Added Successfully!");
            setShowModal(false);
            setFormData({ name: '', rollNo: '', classId: '', section: '', fatherName: '', phone: '' });

            fetchStudents(); // Turant List Update karein
        } catch (err) {
            console.error(err);
            alert("❌ Error: " + (err.response?.data?.message || "Failed to add"));
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo.includes(searchTerm)
    );

    return (
        <div className="p-6 bg-slate-50 min-h-screen">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Student Manager</h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-md">
                    <UserPlus size={20} /> Add Student
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex gap-3">
                <Search className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by Name or Roll No..."
                    className="w-full outline-none text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 border-b">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Roll No</th>
                            <th className="p-4">Class</th>
                            <th className="p-4">Father Name</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr><td colSpan="6" className="p-8 text-center text-gray-400">No students found. Add your first student!</td></tr>
                        ) : (
                            filteredStudents.map((std) => (
                                <tr key={std._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-bold flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                                            {std.name.charAt(0)}
                                        </div>
                                        {std.name}
                                    </td>
                                    <td className="p-4 font-mono text-sm">{std.rollNo}</td>
                                    <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{std.classId}-{std.section}</span></td>
                                    <td className="p-4 text-gray-500">{std.fatherName}</td>
                                    <td className="p-4 text-sm">{std.phone}</td>
                                    <td className="p-4 flex gap-2">
                                        <button className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">New Admission</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 text-2xl">&times;</button>
                        </div>

                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="Student Name" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                <input required placeholder="Roll No" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.rollNo} onChange={e => setFormData({ ...formData, rollNo: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="Class (e.g 10)" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.classId} onChange={e => setFormData({ ...formData, classId: e.target.value })} />
                                <input required placeholder="Section (e.g A)" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} />
                            </div>
                            <input required placeholder="Father's Name" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} />
                            <input required placeholder="Phone Number" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />

                            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition mt-2 shadow-lg flex justify-center gap-2 items-center">
                                {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
                                {loading ? 'Saving...' : 'Confirm Admission'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StudentManager;