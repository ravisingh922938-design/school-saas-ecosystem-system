import React from 'react';
import { Calendar } from 'lucide-react';

const StudentCalendar = () => {
    return (
        <div className="pb-24 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">School Calendar 🗓️</h2>

            {/* Current Month */}
            <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl mb-8 text-center">
                <h3 className="text-3xl font-black">October 2025</h3>
                <p className="opacity-80 text-sm">Academic Session 2025-26</p>
            </div>

            {/* Holidays List */}
            <h3 className="font-bold text-gray-700 mb-4 px-1">Upcoming Holidays</h3>
            <div className="space-y-4">
                {[
                    { date: "02 Oct", day: "Wednesday", name: "Gandhi Jayanti", color: "bg-green-100 text-green-700" },
                    { date: "12 Oct", day: "Sunday", name: "Dussehra", color: "bg-orange-100 text-orange-700" },
                    { date: "24 Oct", day: "Friday", name: "Diwali Break Starts", color: "bg-yellow-100 text-yellow-700" },
                ].map((event, i) => (
                    <div key={i} className="flex items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className={`p-3 rounded-xl text-center min-w-[70px] ${event.color}`}>
                            <span className="block text-xl font-black">{event.date.split(' ')[0]}</span>
                            <span className="text-[10px] uppercase font-bold">{event.date.split(' ')[1]}</span>
                        </div>
                        <div className="ml-4 border-l-2 border-dashed border-gray-200 pl-4">
                            <h4 className="font-bold text-gray-800">{event.name}</h4>
                            <p className="text-xs text-gray-500">{event.day}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentCalendar;