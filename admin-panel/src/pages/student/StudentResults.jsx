import React from 'react';
import { Trophy, TrendingUp, Calendar, Download } from 'lucide-react';

const StudentResults = () => {
    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">My Performance 🏆</h2>

            {/* Result Card */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="text-center">
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">LAST EXAM (MID-TERM)</p>
                    <h1 className="text-6xl font-black">92%</h1>
                    <p className="text-sm font-medium mt-2 opacity-90">Grade: A+ | Rank: 3rd</p>
                </div>
                <button className="mt-6 w-full bg-white/20 backdrop-blur-md py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition">
                    <Download size={16} /> Download Report Card
                </button>
            </div>

            {/* Subject Marks */}
            <h3 className="font-bold text-gray-800 mb-4 px-1">Subject Breakdown</h3>
            <div className="space-y-4">
                {[
                    { sub: "Mathematics", marks: 95, color: "bg-blue-500" },
                    { sub: "Science", marks: 88, color: "bg-green-500" },
                    { sub: "English", marks: 91, color: "bg-orange-500" },
                    { sub: "History", marks: 85, color: "bg-pink-500" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-gray-700">{item.sub}</span>
                            <span className="text-sm font-bold text-gray-900">{item.marks}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.marks}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StudentResults;