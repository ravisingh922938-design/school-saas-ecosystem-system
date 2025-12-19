import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StudentAttendanceGraph = () => {
    // Dummy Data: Last 6 Months Attendance
    const data = [
        { name: 'May', present: 22, total: 26 },
        { name: 'Jun', present: 18, total: 20 },
        { name: 'Jul', present: 24, total: 26 },
        { name: 'Aug', present: 20, total: 25 },
        { name: 'Sep', present: 25, total: 25 }, // 100% Attendance
        { name: 'Oct', present: 15, total: 24 }, // Current Month
    ];

    return (
        <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-4 px-1">
                <div>
                    <h3 className="font-bold text-gray-800 text-sm">Attendance</h3>
                    <p className="text-[10px] text-gray-400 font-medium">Last 6 Months</p>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">
                    92% Avg
                </div>
            </div>

            <div className="h-48 w-full">
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
                                <Cell key={`cell-${index}`} fill={entry.present >= 24 ? '#22c55e' : '#6366f1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span className="text-[10px] text-gray-500">Present</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-gray-500">100% Record</span>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendanceGraph;