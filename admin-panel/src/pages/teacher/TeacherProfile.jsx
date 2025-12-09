import React from 'react';
import { LogOut, FileText, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherProfile = () => {
    return (
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Profile</h2>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
                <img src="https://ui-avatars.com/api/?name=Rahul&background=random" className="w-16 h-16 rounded-full" />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Rahul Sharma</h3>
                    <p className="text-sm text-gray-500">Senior Math Teacher</p>
                    <p className="text-xs text-green-600 font-bold mt-1">ID: T-2025-001</p>
                </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-3">
                <button className="w-full bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm active:scale-95 transition">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Calendar size={20} /></div>
                    <span className="font-bold text-gray-700">Apply for Leave</span>
                </button>

                <button className="w-full bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm active:scale-95 transition">
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><FileText size={20} /></div>
                    <span className="font-bold text-gray-700">Salary Slips</span>
                </button>

                <button className="w-full bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm active:scale-95 transition">
                    <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Settings size={20} /></div>
                    <span className="font-bold text-gray-700">Settings</span>
                </button>
            </div>

            <Link to="/" className="flex items-center justify-center gap-2 w-full mt-10 p-4 text-red-600 font-bold bg-red-50 rounded-xl">
                <LogOut size={20} /> Logout
            </Link>
        </div>
    );
};

export default TeacherProfile;