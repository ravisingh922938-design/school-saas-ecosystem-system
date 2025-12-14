import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const StudentTimeTable = () => {
    const [day, setDay] = useState('Mon');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const schedule = [
        { time: "09:00 AM", sub: "Mathematics", room: "101", color: "border-blue-500" },
        { time: "10:00 AM", sub: "English Lit", room: "102", color: "border-green-500" },
        { time: "11:00 AM", sub: "Physics", room: "Lab 2", color: "border-purple-500" },
        { time: "12:00 PM", sub: "LUNCH BREAK", room: "Canteen", color: "border-gray-300 bg-gray-50", isBreak: true },
        { time: "01:00 PM", sub: "History", room: "103", color: "border-orange-500" },
    ];

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">Class Schedule 📅</h2>

            {/* Day Selector */}
            <div className="flex justify-between bg-white p-2 rounded-2xl shadow-sm mb-6 overflow-x-auto">
                {days.map((d) => (
                    <button
                        key={d}
                        onClick={() => setDay(d)}
                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${day === d ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="space-y-4 pl-2">
                {schedule.map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                        <div className="text-xs font-bold text-gray-400 pt-4 w-16 text-right">{item.time}</div>
                        <div className={`flex-1 p-4 bg-white rounded-2xl border-l-4 shadow-sm ${item.color} ${item.isBreak ? 'bg-gray-50' : ''}`}>
                            <h3 className="font-bold text-gray-800">{item.sub}</h3>
                            {!item.isBreak && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <MapPin size={12} /> Room {item.room}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentTimeTable;