import React from 'react';
import { Link } from 'react-router-dom';
import {
    Bus, Library, User, Settings, LogOut,
    HelpCircle, Image, Calendar
} from 'lucide-react';

const StudentMenu = () => {
    const menuItems = [
        { name: "Bus Tracking", icon: <Bus size={24} />, color: "bg-yellow-100 text-yellow-700" },
        { name: "Library Books", icon: <Library size={24} />, color: "bg-teal-100 text-teal-700" },
        { name: "Events Gallery", icon: <Image size={24} />, color: "bg-pink-100 text-pink-700" },
        { name: "Time Table", icon: <Calendar size={24} />, color: "bg-blue-100 text-blue-700" },
        { name: "Help & Support", icon: <HelpCircle size={24} />, color: "bg-purple-100 text-purple-700" },
        { name: "Profile", icon: <User size={24} />, color: "bg-gray-100 text-gray-700" },
    ];

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">Menu ⚡</h2>

            {/* Profile Snippet */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
                <img src="https://ui-avatars.com/api/?name=Aryan&background=000&color=fff" className="w-14 h-14 rounded-full" />
                <div>
                    <h3 className="font-bold text-lg text-gray-900">Aryan Sharma</h3>
                    <p className="text-sm text-gray-500">Class 10-A • Roll No 21</p>
                    <Link to="/login/student" className="text-xs text-red-500 font-bold mt-1 inline-block">Logout</Link>
                </div>
            </div>

            {/* Grid Menu */}
            <div className="grid grid-cols-2 gap-4">
                {menuItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition">
                        <div className={`p-4 rounded-2xl ${item.color} mb-1`}>
                            {item.icon}
                        </div>
                        <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                    </div>
                ))}
            </div>

            <p className="text-center text-xs text-gray-400 mt-10">App Version 1.0.0</p>
        </div>
    );
};

export default StudentMenu;