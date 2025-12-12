import React, { useEffect, useState } from 'react';
import { Users, BookOpen, IndianRupee, Bell, Search, Menu, Calendar } from 'lucide-react';

const SchoolDashboard = () => {
    const [user, setUser] = useState({ name: 'Principal', schoolId: 'SCHOOL' });

    useEffect(() => {
        // LocalStorage se logged in user ka data nikalo
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        // ✨ Colorful Gradient Background
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans">

            {/* Top Header (Glass Effect) */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <Menu className="text-indigo-600 md:hidden" />
                    <div>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                            {user.schoolId === 'DPS' ? 'Delhi Public School' : 'Galaxy International'}
                        </h1>
                        <p className="text-xs text-gray-500 font-medium tracking-wider">CODE: {user.schoolId}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex bg-white p-2.5 rounded-full text-indigo-500 shadow-sm"><Search size={20} /></div>
                    <div className="bg-white p-2.5 rounded-full relative text-indigo-600 shadow-sm cursor-pointer">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff`} className="w-10 h-10 rounded-full border-2 border-white shadow-md" alt="profile" />
                </div>
            </header>

            <div className="p-6 max-w-7xl mx-auto">

                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-800">Hello, {user.name} 👋</h2>
                    <p className="text-slate-500 mt-1">Here is what’s happening in your school today.</p>
                </div>

                {/* 3 Main Stats Cards (Colorful) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Card 1 */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200 text-white transform hover:-translate-y-1 transition">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><Users size={24} /></div>
                            <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">Update</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-4xl font-bold">1,240</h3>
                            <p className="text-blue-100 text-sm mt-1">Total Students</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-2xl shadow-lg shadow-teal-200 text-white transform hover:-translate-y-1 transition">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><IndianRupee size={24} /></div>
                            <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">+12%</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-4xl font-bold">₹ 4.5 L</h3>
                            <p className="text-emerald-100 text-sm mt-1">Fees Collected</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 rounded-2xl shadow-lg shadow-purple-200 text-white transform hover:-translate-y-1 transition">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><BookOpen size={24} /></div>
                            <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">Today</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-4xl font-bold">96%</h3>
                            <p className="text-purple-100 text-sm mt-1">Staff Attendance</p>
                        </div>
                    </div>
                </div>

                {/* Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><div className="w-2 h-6 bg-red-500 rounded-full"></div> Fee Defaulters</h3>
                            <a href="#" className="text-sm text-indigo-600 font-bold hover:underline">View All</a>
                        </div>
                        <ul className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <li key={i} className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">S{i}</div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Student {i}</p>
                                            <p className="text-xs text-gray-500">Class 10-A</p>
                                        </div>
                                    </div>
                                    <span className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-lg">₹ 5,000</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2"><div className="w-2 h-6 bg-yellow-500 rounded-full"></div> Today's Birthdays</h3>
                        <div className="flex gap-6 overflow-x-auto pb-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="text-center min-w-[80px]">
                                    <div className="w-16 h-16 rounded-full mx-auto mb-2 p-1 border-2 border-dashed border-indigo-300">
                                        <img src={`https://ui-avatars.com/api/?name=Kid${i}&background=random`} className="w-full h-full rounded-full" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">Kid {i}</p>
                                    <button className="text-[10px] mt-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Wish</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolDashboard;