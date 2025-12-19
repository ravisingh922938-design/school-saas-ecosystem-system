import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Download, AlertCircle, Share2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const studentId = user?.enrollmentId || 'DPS-S01';

                const res = await axios.get(`${API_URL}/exams/${studentId}`);
                if (res.data.success) setResults(res.data.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchResults();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-400">Loading Report Card...</div>;

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 p-4 font-sans">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">My Results 🏆</h2>

            {results.length === 0 ? (
                <div className="text-center mt-10 opacity-50">
                    <Trophy size={48} className="mx-auto text-gray-300 mb-2" />
                    <p>No exams results declared yet.</p>
                </div>
            ) : (
                results.map((result, idx) => {
                    const totalObtained = result.subjects.reduce((a, b) => a + b.marks, 0);
                    const totalMax = result.subjects.length * 100;
                    const percentage = Math.round((totalObtained / totalMax) * 100);

                    return (
                        <div key={idx} className="mb-8">

                            {/* 1. Main Score Card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden text-center">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">{result.examName}</p>
                                <h1 className="text-7xl font-black tracking-tighter">{percentage}%</h1>
                                <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium mt-2 border border-white/20">
                                    Grade: A+
                                </div>
                            </div>

                            {/* 2. Subject Breakdown (View Only) */}
                            <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-500 text-xs uppercase tracking-wide">
                                    Subject-wise Performance
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {result.subjects.map((sub, i) => (
                                        <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                            <span className="font-bold text-gray-700">{sub.name}</span>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${sub.marks}%` }}></div>
                                                </div>
                                                <span className="font-bold text-gray-900 w-8 text-right">{sub.marks}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                    <span className="font-bold text-gray-600">Total Score</span>
                                    <span className="font-black text-indigo-600 text-lg">{totalObtained} / {totalMax}</span>
                                </div>
                            </div>

                            {/* 3. Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold shadow-sm flex justify-center items-center gap-2">
                                    <Share2 size={18} /> Share
                                </button>
                                <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 flex justify-center items-center gap-2">
                                    <Download size={18} /> Download PDF
                                </button>
                            </div>

                        </div>
                    );
                })
            )}
        </div>
    );
};

export default StudentResults;