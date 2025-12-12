import React, { useEffect, useState } from 'react';
import { Book, CreditCard, Bell, ChevronRight, Home, Grid, Star } from 'lucide-react';

const StudentDashboard = () => {
    const [user, setUser] = useState({ name: 'Student', enrollmentId: 'S-000' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    return (
        // ✨ Orange/Pink Gradient Background
        <div className="min-h-screen bg-gradient-to-tr from-orange-50 via-rose-50 to-amber-50 pb-24 font-sans flex justify-center">

            <div className="w-full max-w-md min-h-screen relative shadow-2xl bg-white/30">

                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md px-6 py-5 flex justify-between items-center shadow-sm sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <div className="p-0.5 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full">
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=fff`} className="w-10 h-10 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{user.name}</h3>
                            <p className="text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full inline-block">ID: {user.enrollmentId}</p>
                        </div>
                    </div>
                    <div className="p-2.5 bg-white rounded-full text-gray-400 shadow-sm border border-gray-100">
                        <Bell size={20} />
                    </div>
                </div>

                <div className="p-5 space-y-6 overflow-y-auto">

                    {/* Fee Alert (Gradient Card) */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 rounded-[2rem] text-white shadow-xl shadow-red-300 relative overflow-hidden transform hover:scale-[1.02] transition duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <p className="bg-red-700/50 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm">⚠️ Payment Due</p>
                                <Star size={16} className="text-yellow-300 fill-yellow-300" />
                            </div>
                            <div className="flex justify-between items-end mt-2">
                                <div>
                                    <h2 className="text-4xl font-black">₹ 2,500</h2>
                                    <p className="text-xs text-red-100 mt-1 opacity-80">Due by 15th Oct</p>
                                </div>
                                <button className="bg-white text-red-600 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg active:scale-95 transition">
                                    PAY NOW
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Homework Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h3 className="font-extrabold text-gray-800 text-lg tracking-tight">Homework</h3>
                            <span className="text-orange-600 text-xs font-bold flex items-center bg-orange-50 px-2 py-1 rounded-md cursor-pointer">See All <ChevronRight size={14} /></span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { sub: 'Maths', task: 'Algebra Ex 4.2', color: 'text-blue-600', bg: 'bg-blue-50' },
                                { sub: 'Science', task: 'Physics Project', color: 'text-green-600', bg: 'bg-green-50' }
                            ].map((hw, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-sm flex gap-4 items-center active:scale-[0.98] transition">
                                    <div className={`${hw.bg} p-3.5 rounded-2xl ${hw.color}`}><Book size={22} /></div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm">{hw.task}</h4>
                                        <p className="text-xs text-gray-400 mt-0.5 font-medium">{hw.sub} • Due Tomorrow</p>
                                    </div>
                                    <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-white shadow-sm"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Menu */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-3xl text-center shadow-sm border border-white cursor-pointer hover:shadow-md transition">
                            <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3"><CreditCard size={24} /></div>
                            <span className="font-bold text-gray-700 text-sm">Receipts</span>
                        </div>
                        <div className="bg-white p-5 rounded-3xl text-center shadow-sm border border-white cursor-pointer hover:shadow-md transition">
                            <div className="w-12 h-12 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-3"><Book size={24} /></div>
                            <span className="font-bold text-gray-700 text-sm">Results</span>
                        </div>
                    </div>
                </div>

                {/* Floating Bottom Nav */}
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex gap-8 items-center z-50">
                    <Home size={22} className="text-orange-400" />
                    <Book size={22} className="text-gray-400 hover:text-white transition" />
                    <Grid size={22} className="text-gray-400 hover:text-white transition" />
                </div>

            </div>
        </div>
    );
};

export default StudentDashboard;