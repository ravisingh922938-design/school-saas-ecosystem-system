import React, { useState } from 'react';
import axios from 'axios';
import { User, BookOpen, CheckCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdmissionForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', rollNo: '', classId: '10', section: 'A', fatherName: '', phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // User se School ID nikalo
        const user = JSON.parse(localStorage.getItem('user'));
        const schoolId = user?.schoolId || 'DPS';

        try {
            await axios.post(`${API_URL}/students/add`, { ...formData, schoolId });
            alert("✅ Admission Successful! Student added to Class List.");
            setFormData({ name: '', rollNo: '', classId: '10', section: 'A', fatherName: '', phone: '' });
        } catch (err) {
            alert("Failed to admit student");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-blue-600" /> New Admission
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Student Name</label>
                        <input type="text" required className="w-full p-3 border rounded-xl"
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Roll No</label>
                        <input type="text" required className="w-full p-3 border rounded-xl"
                            value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Class</label>
                        <select className="w-full p-3 border rounded-xl bg-white"
                            value={formData.classId} onChange={(e) => setFormData({ ...formData, classId: e.target.value })}>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Section</label>
                        <select className="w-full p-3 border rounded-xl bg-white"
                            value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-500">Father's Name</label>
                    <input type="text" className="w-full p-3 border rounded-xl"
                        value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center gap-2 mt-4">
                    {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                    Confirm Admission
                </button>
            </form>
        </div>
    );
};

export default AdmissionForm;