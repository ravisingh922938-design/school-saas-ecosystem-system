import React from 'react';

const StudentAttendance = () => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const getStatusColor = (day) => {
        if ([5, 12, 19, 26].includes(day)) return 'bg-yellow-100 text-yellow-600';
        if ([8, 22].includes(day)) return 'bg-red-100 text-red-600 font-bold';
        return 'bg-green-100 text-green-600';
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Attendance</h2>
            <p className="text-gray-500 text-sm mb-6">October 2025 • <span className="text-green-600 font-bold">92% Present</span></p>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-xs text-gray-400 font-bold">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-3">
                    {days.map((day) => (
                        <div key={day} className={`aspect-square flex items-center justify-center rounded-lg text-xs ${getStatusColor(day)}`}>{day}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default StudentAttendance;