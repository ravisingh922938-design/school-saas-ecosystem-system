import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const TeacherTimeTable = () => {
    const [day, setDay] = useState('Mon');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Schedule Data
    const schedule = [
        { time: "09:00 AM", class: "10-A", sub: "Mathematics", room: "101", color: "border-teal-500" },
        { time: "10:00 AM", class: "9-B", sub: "Physics", room: "Lab 2", color: "border-blue-500" },
        { time: "11:00 AM", class: "-", sub: "Free Period", room: "Staff Room", color: "border-gray-300 bg-gray-50", isFree: true },
        { time: "12:00 PM", class: "8-C", sub: "Maths Doubt Session", room: "104", color: "border-purple-500" },
    ];

    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">My Schedule 📅</h2>

            {/* Day Selector */}
            <div className="flex justify-between bg-white p-2 rounded-2xl shadow-sm mb-6 overflow-x-auto">
                {days.map((d) => (
                    <button
                        key={d}
                        onClick={() => setDay(d)}
                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${day === d ? 'bg-teal-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {schedule.map((item, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="text-xs font-bold text-gray-400 pt-4 w-16 text-right">{item.time}</div>

                        <div className={`flex-1 p-4 bg-white rounded-2xl border-l-4 shadow-sm ${item.color} ${item.isFree ? 'opacity-70' : ''}`}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{item.sub}</h3>
                                {!item.isFree && <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">{item.class}</span>}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin size={12} /> {item.room}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherTimeTable;