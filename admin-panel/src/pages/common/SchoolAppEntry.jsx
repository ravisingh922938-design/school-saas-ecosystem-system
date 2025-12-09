import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';

const SchoolAppEntry = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center p-6 font-sans">

            {/* App Logo / Branding Area */}
            <div className="text-center mb-10 animation-fade-in-down">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4 transform rotate-3 hover:rotate-0 transition-all duration-500">
                    <span className="text-white text-4xl font-extrabold">S</span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">School Connect</h1>
                <p className="text-gray-500 mt-2">Your Digital Campus Partner</p>
            </div>

            {/* Main Card Container */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-900/5 overflow-hidden border border-white">

                <div className="p-8 pb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome Back! 👋</h2>
                    <p className="text-gray-400 text-sm">Please choose your profile to continue.</p>
                </div>

                <div className="px-6 pb-8 space-y-4">

                    {/* Option 1: PRINCIPAL */}
                    <Link to="/login/school" className="group block">
                        <div className="flex items-center p-4 bg-blue-50 border border-blue-100 rounded-2xl transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 group-hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:text-blue-600">
                                <Building2 size={24} />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-white transition-colors">Principal / Admin</h3>
                                <p className="text-xs text-gray-500 group-hover:text-blue-100 transition-colors">Manage Institute</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-white transition-colors" size={20} />
                        </div>
                    </Link>

                    {/* Option 2: TEACHER */}
                    <Link to="/login/teacher" className="group block">
                        <div className="flex items-center p-4 bg-green-50 border border-green-100 rounded-2xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-green-600/30 group-hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm group-hover:text-green-600">
                                <UserCheck size={24} />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-white transition-colors">Teacher</h3>
                                <p className="text-xs text-gray-500 group-hover:text-green-100 transition-colors">Classroom Portal</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-white transition-colors" size={20} />
                        </div>
                    </Link>

                    {/* Option 3: STUDENT */}
                    <Link to="/login/student" className="group block">
                        <div className="flex items-center p-4 bg-orange-50 border border-orange-100 rounded-2xl transition-all duration-200 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 group-hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:text-orange-500">
                                <GraduationCap size={24} />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-white transition-colors">Student / Parent</h3>
                                <p className="text-xs text-gray-500 group-hover:text-orange-100 transition-colors">Learning & Fees</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-white transition-colors" size={20} />
                        </div>
                    </Link>

                </div>

                {/* Footer Area */}
                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Need help? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Support</a>
                    </p>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-300">Powered by SchoolSaaS v2.0</p>
        </div>
    );
};

export default SchoolAppEntry;