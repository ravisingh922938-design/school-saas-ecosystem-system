import React from 'react';
import { User, Mail, Phone, MapPin, LogOut, Settings, Moon, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentProfile = () => {
    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Profile */}
            <div className="bg-white p-6 mb-4 flex flex-col items-center border-b border-gray-100">
                <div className="w-24 h-24 p-1 rounded-full border-2 border-dashed border-orange-400 mb-3">
                    <img src="https://ui-avatars.com/api/?name=Aryan&background=random" className="w-full h-full rounded-full" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">Aryan Sharma</h2>
                <p className="text-sm text-gray-500">Class 10-A • Roll No. 21</p>
            </div>

            <div className="px-4 space-y-6">

                {/* Personal Details */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Personal Info</h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Mail size={18} /></div>
                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm font-semibold text-gray-800">aryan@student.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-green-50 p-2 rounded-lg text-green-600"><Phone size={18} /></div>
                            <div>
                                <p className="text-xs text-gray-400">Parent's Mobile</p>
                                <p className="text-sm font-semibold text-gray-800">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><MapPin size={18} /></div>
                            <div>
                                <p className="text-xs text-gray-400">Address</p>
                                <p className="text-sm font-semibold text-gray-800">123, Civil Lines, Delhi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* App Settings */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Settings</h3>

                    <div className="space-y-1">
                        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
                            <div className="flex items-center gap-3">
                                <Moon size={20} className="text-gray-600" />
                                <span className="font-medium text-gray-700">Dark Mode</span>
                            </div>
                            <div className="w-10 h-5 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div></div>
                        </button>

                        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
                            <div className="flex items-center gap-3">
                                <Globe size={20} className="text-gray-600" />
                                <span className="font-medium text-gray-700">Language</span>
                            </div>
                            <span className="text-xs font-bold text-blue-600">English</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
                            <div className="flex items-center gap-3">
                                <Settings size={20} className="text-gray-600" />
                                <span className="font-medium text-gray-700">Change Password</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
                <Link to="/login/student">
                    <button className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition active:scale-95">
                        <LogOut size={20} /> Log Out
                    </button>
                </Link>

                <p className="text-center text-xs text-gray-400 pb-4">SchoolOS v1.2.0</p>

            </div>
        </div>
    );
};

export default StudentProfile;