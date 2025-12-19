import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StudentAttendanceGraph = ({ graphData }) => {
    // Agar data nahi hai to Empty dikhao, par crash mat hone do
    const data = graphData && graphData.length > 0 ? graphData : [
        { name: 'Aug', present: 0, total: 25 },
        { name: 'Sep', present: 0, total: 25 },
        { name: 'Oct', present: 0, total: 25 },
    ];

    return (
        <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-4 px-1">
                <div>
                    <h3 className="font-bold text-gray-800 text-sm">Attendance Report</h3>
                    <p className="text-[10px] text-gray-400 font-medium">Last 3 Months</p>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live
                </div>
            </div>

            <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={12}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#9ca3af' }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: '#f3f4f6' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="present" radius={[10, 10, 10, 10]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.present >= 20 ? '#22c55e' : '#6366f1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StudentAttendanceGraph;