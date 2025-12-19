import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, XCircle, Save, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherAttendance = () => {
    const [loading, setLoading] = useState(false);

    // Fake Students List (Real app me ye bhi DB se aayegi)
    const [students, setStudents] = useState([
        { id: "DPS-S01", name: "Arav Sharma", roll: 1, status: "Present" },
        { id: "DPS-S02", name: "Aditi Verma", roll: 2, status: "Present" },
        { id: "DPS-S03", name: "Rohan Singh", roll: 3, status: "Absent" },
    ]);

    const toggleStatus = (id) => {
        setStudents(students.map(std =>
            std.id === id ? { ...std, status: std.status === "Present" ? "Absent" : "Present" } : std
        ));
    };

    const submitAttendance = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));

        const payload = {
            schoolId: user?.schoolId || 'DPS',
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            classId: "10-A",
            records: students.map(s => ({ studentId: s.id, studentName: s.name, status: s.status }))
        };

        try {
            await axios.post(`${API_URL}/attendance/mark`, payload);
            alert("✅ Attendance Marked Successfully!");
        } catch (err) {
            alert("❌ Failed to save.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 pb-24 min-h-screen bg-slate-50 font-sans select-none">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Attendance 📝</h2>
                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Calendar size={14} /> {new Date().toDateString()}
                </div>
            </div>

            <div className="space-y-3 mb-20">
                {students.map((std) => (
                    <div key={std.id} onClick={() => toggleStatus(std.id)}
                        className={`flex justify-between items-center p-4 rounded-2xl border-2 cursor-pointer transition active:scale-95 ${std.status === "Present" ? 'bg-white border-teal-100' : 'bg-red-50 border-red-100'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{std.roll}</div>
                            <div>
                                <h4 className="font-bold text-gray-800">{std.name}</h4>
                                <p className="text-xs text-gray-400">ID: {std.id}</p>
                            </div>
                        </div>
                        {std.status === "Present" ? <CheckCircle size={28} className="text-teal-500 fill-teal-50" /> : <XCircle size={28} className="text-red-500 fill-red-50" />}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-20 left-0 w-full px-6">
                <button onClick={submitAttendance} disabled={loading} className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-teal-200 active:scale-95 transition flex justify-center items-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    {loading ? 'Saving...' : 'Submit Attendance'}
                </button>
            </div>
        </div>
    );
};

export default TeacherAttendance;