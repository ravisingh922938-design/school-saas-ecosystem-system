import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Building, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center">
            <div className="pl-[30px] pr-6 w-full max-w-[1400px]">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Who are you?</h1>
                    <p className="text-xl text-gray-500">Select your profile.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { id: 'super-admin', title: 'Super Admin', icon: <Shield size={32} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { id: 'school', title: 'Principal', icon: <Building size={32} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { id: 'teacher', title: 'Teacher', icon: <UserCheck size={32} />, color: 'text-green-600', bg: 'bg-green-50' },
                        { id: 'student', title: 'Student', icon: <GraduationCap size={32} />, color: 'text-orange-600', bg: 'bg-orange-50' }
                    ].map((role) => (
                        <div key={role.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                            <div className={`w-16 h-16 ${role.bg} rounded-2xl flex items-center justify-center mb-6 ${role.color} group-hover:scale-110 transition-transform`}>
                                {role.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                            <Link to={`/login/${role.id}`}>
                                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                                    Login <ArrowRight size={18} />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default RoleSelection;