import React from 'react';
import { Link } from 'react-router-dom';
import { Building, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';

const SchoolGateway = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-4">
                    <Building size={32} className="text-blue-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    School Login Portal
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto">
                    Welcome! Please select your role to access the school management system.
                </p>
            </div>

            {/* 3 Cards Grid (NO SUPER ADMIN HERE) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

                {/* Card 1: PRINCIPAL */}
                <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 mx-auto group-hover:scale-110 transition-transform">
                        <Building size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Principal / Admin</h3>
                    <p className="text-sm text-gray-500 mt-2 mb-6">Manage Institute & Staff.</p>
                    <Link to="/login/school">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                            Principal Login <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>

                {/* Card 2: TEACHER */}
                <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-green-300 transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 mx-auto group-hover:scale-110 transition-transform">
                        <UserCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Teacher</h3>
                    <p className="text-sm text-gray-500 mt-2 mb-6">Attendance & Marks.</p>
                    <Link to="/login/teacher">
                        <button className="w-full bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                            Teacher Login <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>

                {/* Card 3: STUDENT */}
                <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-orange-300 transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 mx-auto group-hover:scale-110 transition-transform">
                        <GraduationCap size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Student</h3>
                    <p className="text-sm text-gray-500 mt-2 mb-6">Homework & Fees.</p>
                    <Link to="/login/student">
                        <button className="w-full bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                            Student Login <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>

            </div>

            <div className="mt-12 text-gray-400 text-sm">
                Powered by SchoolSaaS Ecosystem
            </div>
        </div>
    );
};

export default SchoolGateway;
