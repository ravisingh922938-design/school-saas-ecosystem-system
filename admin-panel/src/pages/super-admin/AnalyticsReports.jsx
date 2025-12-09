import React from 'react';
import { BarChart2, PieChart, TrendingUp, Download } from 'lucide-react';

const AnalyticsReports = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Business Analytics</h2>
                <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50">
                    <Download size={18} /> Export CSV
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Revenue Growth Chart Placeholder */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2"><TrendingUp size={20} /> Revenue Growth</h3>
                        <select className="border rounded p-1 text-sm"><option>This Year</option></select>
                    </div>
                    <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                        [ Line Chart Component: Monthly Income ]
                    </div>
                </div>

                {/* Plan Distribution Placeholder */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2"><PieChart size={20} /> Plan Distribution</h3>
                    </div>
                    <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                        [ Pie Chart: Basic (40%) vs Premium (60%) ]
                    </div>
                </div>

                {/* Top Performing Schools */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 col-span-2">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><BarChart2 size={20} /> Top Performing Schools (By Student Count)</h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="w-6 font-bold text-slate-400">0{i}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-bold text-slate-700">Delhi Public School {i}</span>
                                        <span className="text-slate-500">2,400 Students</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${80 - (i * 10)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalyticsReports;