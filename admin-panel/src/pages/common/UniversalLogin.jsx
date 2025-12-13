import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';

const UniversalLogin = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Config (Sirf dikhane ke liye)
    const config = {
        'super-admin': { title: 'Super Admin', label: 'Admin Email', gradient: 'from-slate-800 to-slate-900' },
        'school': { title: 'Principal Login', label: 'School Email', gradient: 'from-blue-700 to-indigo-900' },
        'teacher': { title: 'Teacher Portal', label: 'Employee ID', gradient: 'from-emerald-600 to-teal-900' },
        'student': { title: 'Student Portal', label: 'Enrollment ID', gradient: 'from-orange-500 to-red-900' },
    }[role] || { title: 'Login', label: 'Username', gradient: 'from-gray-700 to-gray-900' };

    // --- DIRECT ENTRY LOGIC (NO PASSWORD CHECK) ---
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Fake User Data set karo (Taaki Dashboard crash na ho)
        const fakeUser = {
            name: role === 'school' ? 'Principal Sir' : role === 'student' ? 'Student' : 'User',
            role: role,
            schoolId: 'DPS' // Dummy School
        };

        localStorage.setItem('token', 'bypass-token-123'); // Fake Token
        localStorage.setItem('user', JSON.stringify(fakeUser));

        // 2. Turant Redirect karo (0.5 sec delay for feel)
        setTimeout(() => {
            if (role === 'super-admin') navigate('/super-admin');
            else if (role === 'school') navigate('/school');
            else if (role === 'teacher') navigate('/teacher');
            else if (role === 'student') navigate('/student');
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            <div className={`hidden lg:flex w-1/2 bg-gradient-to-br ${config.gradient} relative overflow-hidden flex-col justify-between p-12 text-white`}>
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SchoolOS</span>
                </div>
                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">{config.title}</h1>
                    <p className="text-xl text-blue-100 font-light">Direct Access Mode Enabled</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50/50">
                <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white">
                    <Link to="/select-role" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-600 mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-1" /> Change Role
                    </Link>

                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-green-600 font-medium">✨ Demo Mode: No Password Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Fake Inputs just for show */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">{config.label}</label>
                            <div className="relative"><User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input type="text" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Any ID works..." /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Password</label>
                            <div className="relative"><Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input type="password" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Any Password works..." /></div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enter Dashboard 🚀'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UniversalLogin;