import React, { useEffect, useState } from 'react';
import { CheckSquare, BookOpen, Clock, Calendar, Bell } from 'lucide-react';

const TeacherDashboard = () => {
    const [user, setUser] = useState({ name: 'Teacher', employeeId: 'T-000' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    return (
        // ✨ Green/Teal Gradient Background
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-50 pb-20 font-sans flex justify-center">

            <div className="w-full max-w-md min-h-screen relative overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm">

                {/* Header Section */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 pt-10 rounded-b-[3rem] text-white shadow-xl relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=fff&color=0d9488`} className="w-12 h-12 rounded-full border-2 border-teal-200 shadow-md" alt="Teacher" />
                            <div>
                                <p className="text-teal-100 text-xs font-bold uppercase tracking-wider">Good Morning,</p>
                                <h1 className="text-xl font-extrabold">{user.name}</h1>
                            </div>
                        </div>
                        <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md cursor-pointer hover:bg-white/30 transition">
                            <Bell size={20} className="text-white" />
                        </div>
                    </div>

                    {/* Floating Action Card */}
                    <div className="bg-white text-gray-800 p-5 rounded-3xl shadow-2xl flex justify-between items-center transform translate-y-8 border-4 border-teal-50">
                        <div>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">NEXT CLASS</p>
                            <h3 className="font-extrabold text-xl text-gray-800">Class 10-A</h3>
                            <p className="text-xs text-teal-600 font-bold bg-teal-50 px-2 py-1 rounded-md inline-block mt-1">Starts in 10 mins</p>
                        </div>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-2xl shadow-lg shadow-teal-600/40 transition active:scale-95">
                            <CheckSquare size={28} />
                        </button>
                    </div>
                </div>

                {/* Body Content */}
                <div className="mt-14 p-6">
                    <h3 className="font-bold text-teal-900 mb-6 flex items-center gap-2 text-lg">
                        <div className="bg-teal-100 p-2 rounded-lg"><Calendar size={20} className="text-teal-700" /></div>
                        Today's Schedule
                    </h3>

                    <div className="space-y-6 relative">
                        <div className="absolute left-[3.5rem] top-4 bottom-4 w-0.5 bg-teal-200/50 dashed"></div>

                        {/* Class Items */}
                        {[
                            { time: '09:00', sub: 'Maths', room: '101', color: 'border-blue-500' },
                            { time: '11:00', sub: 'Science', room: 'Lab 2', color: 'border-purple-500' },
                            { time: '01:00', sub: 'Lunch', room: 'Break', color: 'border-gray-400 bg-gray-100', isBreak: true }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4 relative group">
                                <div className="text-gray-400 font-bold text-xs w-12 pt-4 text-right group-hover:text-teal-600 transition">{item.time}</div>
                                <div className={`p-4 rounded-2xl shadow-sm flex-1 border-l-4 transition hover:scale-[1.02] cursor-pointer ${item.isBreak ? 'bg-gray-200/50' : 'bg-white border-gray-100'} ${item.color}`}>
                                    <h4 className="font-bold text-gray-800">{item.sub}</h4>
                                    {!item.isBreak && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><BookOpen size={12} /> Room {item.room}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl text-white p-3 rounded-full shadow-2xl flex justify-around items-center z-50">
                    <div className="bg-teal-500 p-2 rounded-full"><CheckSquare size={20} /></div>
                    <BookOpen size={20} className="text-gray-400" />
                    <Clock size={20} className="text-gray-400" />
                </div>

            </div>
        </div>
    );
};

export default TeacherDashboard;