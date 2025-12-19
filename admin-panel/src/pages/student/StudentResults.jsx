import React, { useState } from 'react';
import axios from 'axios';
import { Save, User, Calculator } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherMarks = () => {
    const [loading, setLoading] = useState(false);

    // Demo Student Selection
    const [studentId, setStudentId] = useState("DPS-S01"); // Default Student
    const [marks, setMarks] = useState({ math: "", sci: "", eng: "" });

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload = {
                studentId: studentId, // Teacher select karega (Abhi hardcoded hai demo ke liye)
                examName: "Final Term Exam",
                subjects: [
                    { name: "Mathematics", marks: parseInt(marks.math), total: 100 },
                    { name: "Science", marks: parseInt(marks.sci), total: 100 },
                    { name: "English", marks: parseInt(marks.eng), total: 100 }
                ]
            };

            await axios.post(`${API_URL}/exams/add`, payload);
            alert(`✅ Result Uploaded for ${studentId}`);
            setMarks({ math: "", sci: "", eng: "" }); // Clear form

        } catch (err) {
            alert("Failed to save marks");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 pb-24 min-h-screen bg-slate-50 font-sans">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Marks Entry 📝</h2>

            {/* Student Selector (Simple Input for now) */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600"><User /></div>
                <div className="flex-1">
                    <label className="text-xs font-bold text-gray-400 block">Student ID</label>
                    <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="font-bold text-gray-800 outline-none w-full" />
                </div>
            </div>

            {/* Marks Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
                    <span className="font-bold text-indigo-900">Final Term Exam</span>
                    <Calculator size={18} className="text-indigo-500" />
                </div>

                <div className="p-2">
                    {[
                        { name: "Mathematics", key: "math", color: "text-blue-600" },
                        { name: "Science", key: "sci", color: "text-green-600" },
                        { name: "English", key: "eng", color: "text-pink-600" }
                    ].map((sub, i) => (
                        <div key={i} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0">
                            <span className={`font-bold ${sub.color}`}>{sub.name}</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="00"
                                    value={marks[sub.key]}
                                    onChange={(e) => setMarks({ ...marks, [sub.key]: e.target.value })}
                                    className="w-16 p-2 text-center bg-gray-50 border border-gray-200 rounded-lg font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                                <span className="text-xs text-gray-400">/ 100</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={handleSave} disabled={loading} className="w-full mt-6 bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition flex justify-center items-center gap-2">
                <Save size={20} /> {loading ? "Saving..." : "Publish Result"}
            </button>
        </div>
    );
};

export default TeacherMarks;