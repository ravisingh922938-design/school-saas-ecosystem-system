import React, { useState } from 'react';
import axios from 'axios';
import { Save, User, Calculator, CheckCircle, FileText } from 'lucide-react';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherMarks = () => {
    const [loading, setLoading] = useState(false);

    // Form States
    const [studentId, setStudentId] = useState("DPS-S01"); // Default for demo
    const [examName, setExamName] = useState("Mid-Term Exam");
    const [marks, setMarks] = useState({ math: "", sci: "", eng: "", hist: "", comp: "" });

    const handleSave = async () => {
        // Validation
        if (!studentId || !marks.math) {
            alert("Please fill Student ID and Marks");
            return;
        }

        setLoading(true);

        // Data Structure for Backend
        const payload = {
            studentId: studentId,
            examName: examName,
            subjects: [
                { name: "Mathematics", marks: parseInt(marks.math || 0), total: 100 },
                { name: "Science", marks: parseInt(marks.sci || 0), total: 100 },
                { name: "English", marks: parseInt(marks.eng || 0), total: 100 },
                { name: "History", marks: parseInt(marks.hist || 0), total: 100 },
                { name: "Computer", marks: parseInt(marks.comp || 0), total: 100 }
            ]
        };

        try {
            // ✅ REAL API CALL to Save Result
            const res = await axios.post(`${API_URL}/exams/add`, payload);

            if (res.data.success) {
                alert(`✅ Result Published Successfully for ${studentId}!`);
                // Clear marks only (keep student id for next exam maybe)
                setMarks({ math: "", sci: "", eng: "", hist: "", comp: "" });
            }
        } catch (err) {
            console.error(err);
            alert("❌ Failed to save marks. Check Internet or Server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 pb-24 min-h-screen bg-slate-50 font-sans select-none">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Marks Entry 📝</h2>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                    Term 1
                </div>
            </div>

            {/* 1. Student Selection */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Student Details</label>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 mb-3">
                    <User className="text-gray-400" />
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="bg-transparent font-bold text-gray-800 outline-none w-full"
                        placeholder="Enter Student ID (e.g. DPS-S01)"
                    />
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <FileText className="text-gray-400" />
                    <select
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        className="bg-transparent font-bold text-gray-800 outline-none w-full"
                    >
                        <option>Mid-Term Exam</option>
                        <option>Final Exam</option>
                        <option>Unit Test 1</option>
                    </select>
                </div>
            </div>

            {/* 2. Marks Input Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
                    <span className="font-bold text-indigo-900">Enter Subject Marks</span>
                    <Calculator size={18} className="text-indigo-500" />
                </div>

                <div className="divide-y divide-gray-50">
                    {[
                        { name: "Mathematics", key: "math", color: "text-blue-600" },
                        { name: "Science", key: "sci", color: "text-green-600" },
                        { name: "English", key: "eng", color: "text-pink-600" },
                        { name: "History", key: "hist", color: "text-orange-600" },
                        { name: "Computer", key: "comp", color: "text-purple-600" }
                    ].map((sub, i) => (
                        <div key={i} className="flex justify-between items-center p-4">
                            <span className={`font-bold ${sub.color}`}>{sub.name}</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={marks[sub.key]}
                                    onChange={(e) => setMarks({ ...marks, [sub.key]: e.target.value })}
                                    className="w-20 p-2 text-center bg-gray-50 border border-gray-200 rounded-lg font-bold focus:ring-2 focus:ring-teal-500 outline-none text-lg"
                                />
                                <span className="text-xs text-gray-400 font-medium">/ 100</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Submit Button */}
            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition flex justify-center items-center gap-2"
            >
                {loading ? (
                    'Uploading...'
                ) : (
                    <>
                        <CheckCircle size={20} /> Publish Result
                    </>
                )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                This will be visible on Student App instantly.
            </p>

        </div>
    );
};

export default TeacherMarks;