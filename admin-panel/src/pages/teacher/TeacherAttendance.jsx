import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, XCircle, Save, Loader2, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherAttendance = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState("10"); // Default

    // 1. Fetch Students from DB (Jo Principal ne add kiye)
    useEffect(() => {
        const fetchClassStudents = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const schoolId = user?.schoolId || 'DPS';

                const res = await axios.get(`${API_URL}/students/list`, {
                    params: { schoolId, classId: selectedClass, section: 'A' }
                });

                if (res.data.success) {
                    // Add 'status' field for local state
                    const dataWithStatus = res.data.data.map(s => ({ ...s, status: 'Present' }));
                    setStudents(dataWithStatus);
                }
            } catch (err) { console.error(err); }
        };
        fetchClassStudents();
    }, [selectedClass]); // Jab class badlegi, list update hogi

    const toggleStatus = (id) => {
        setStudents(students.map(std =>
            std._id === id ? { ...std, status: std.status === "Present" ? "Absent" : "Present" } : std
        ));
    };

    const submitAttendance = async () => {
        // ... (Purana logic same rahega) ...
        alert("Attendance Marked for " + students.length + " Students!");
    };

    return (
        <div className="p-5 pb-24 min-h-screen bg-slate-50 font-sans select-none">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Attendance 📝</h2>
                <select
                    className="bg-white border p-2 rounded-lg text-sm font-bold outline-none"
                    value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                </select>
            </div>

            {/* List */}
            <div className="space-y-3 mb-20">
                {students.length === 0 ? <p className="text-center text-gray-400 mt-10">No students found in Class {selectedClass}-A</p> :
                    students.map((std) => (
                        <div key={std._id} onClick={() => toggleStatus(std._id)}
                            className={`flex justify-between items-center p-4 rounded-2xl border-2 cursor-pointer transition active:scale-95 ${std.status === "Present" ? 'bg-white border-teal-100' : 'bg-red-50 border-red-100'}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{std.rollNo}</div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{std.name}</h4>
                                    <p className="text-xs text-gray-400">Class {std.classId}-{std.section}</p>
                                </div>
                            </div>
                            {std.status === "Present" ? <CheckCircle size={28} className="text-teal-500 fill-teal-50" /> : <XCircle size={28} className="text-red-500 fill-red-50" />}
                        </div>
                    ))}
            </div>

            {/* Save Button */}
            <div className="fixed bottom-20 left-0 w-full px-6">
                <button onClick={submitAttendance} className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-xl">
                    Submit Attendance
                </button>
            </div>
        </div>
    );
};

export default TeacherAttendance;