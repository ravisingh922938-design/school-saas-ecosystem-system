import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import axios from 'axios';

// API Link
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const UniversalLogin = () => {
    const { role } = useParams();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [inputId, setInputId] = useState('');
    const [password, setPassword] = useState('');

    // --- CONFIGURATION (Demo Credentials Included) ---
    const config = {
        'super-admin': {
            title: 'Super Admin',
            label: 'Admin Email',
            placeholder: 'admin@saas.com',
            demoUser: 'admin@saas.com',
            demoPass: 'admin123',
            welcome: 'Manage your entire SaaS ecosystem.',
            gradient: 'from-slate-800 to-slate-900'
        },
        'school': {
            title: 'Principal / Admin',
            label: 'School Email',
            placeholder: 'principal@school1.com',
            demoUser: 'principal@school1.com',
            demoPass: 'school1',
            welcome: 'Oversee your institute\'s growth.',
            gradient: 'from-blue-700 to-indigo-900'
        },
        'teacher': {
            title: 'Teacher Portal',
            label: 'Email / Emp ID',
            placeholder: 't1@school1.com',
            demoUser: 't1@school1.com',
            demoPass: 'teach11',
            welcome: 'Manage classes & attendance efficiently.',
            gradient: 'from-emerald-600 to-teal-900'
        },
        'student': {
            title: 'Student Portal',
            label: 'Enrollment ID',
            placeholder: 's1@school1.com',
            demoUser: 's1@school1.com',
            demoPass: 'std11',
            welcome: 'Access your learning journey.',
            gradient: 'from-orange-500 to-red-900'
        },
    }[role] || { title: 'Login', label: 'Username', gradient: 'from-gray-700 to-gray-900' };

    // --- SMART LOGIN LOGIC ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // 1. DEMO BYPASS (Agar Database khali ho ya Demo dikhana ho)
        if (inputId === config.demoUser && password === config.demoPass) {
            setTimeout(() => {
                localStorage.setItem('token', 'demo-token-123');
                localStorage.setItem('user', JSON.stringify({ name: 'Demo User', role: role, schoolId: 'DEMO' }));

                // Demo me Default Theme use karein
                localStorage.removeItem('schoolTheme');

                // Redirect
                window.location.href = (role === 'super-admin') ? '/super-admin' :
                    (role === 'school') ? '/school' :
                        (role === 'teacher') ? '/teacher' : '/student';
            }, 1000);
            return;
        }

        // 2. REAL BACKEND CHECK (Custom Branding ke sath)
        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, {
                role,
                identifier: inputId,
                password: password
            });

            if (data.success) {
                // Token Save
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // ✨ MAGIC: Branding Save Karna (Agar School ka custom color hai)
                if (data.branding) {
                    const customTheme = {
                        name: data.branding.tagline || 'School App', // School Name ya Tagline
                        logo: data.branding.logo,
                        primaryColor: data.branding.primaryColor,
                        secondaryColor: data.branding.secondaryColor,
                        tagline: data.branding.tagline
                    };
                    localStorage.setItem('schoolTheme', JSON.stringify(customTheme));
                } else {
                    localStorage.removeItem('schoolTheme'); // Default Theme
                }

                // Force Refresh Redirect (Taaki Color turant badal jaye)
                window.location.href = (role === 'super-admin') ? '/super-admin' :
                    (role === 'school') ? '/school' :
                        (role === 'teacher') ? '/teacher' : '/student';
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || 'Invalid Credentials! Try Demo IDs below.');
        } finally {
            if (inputId !== config.demoUser) setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">

            {/* LEFT SIDE: Visuals */}
            <div className={`hidden lg:flex w-1/2 bg-gradient-to-br ${config.gradient} relative overflow-hidden flex-col justify-between p-12 text-white`}>
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SchoolOS</span>
                </div>
                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">{config.title}</h1>
                    <p className="text-xl text-blue-100 font-light">{config.welcome}</p>
                </div>
                <div className="relative z-10 text-sm text-white/60">
                    © 2025 SchoolOS Ecosystem. Secure & Encrypted.
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50/50">
                <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white">

                    <Link to="/select-role" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-600 mb-8 transition-colors group">
                        <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        Change Role
                    </Link>

                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                        <p className="text-gray-500">Please enter your details to continue.</p>
                    </div>

                    {/* Error Box */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-pulse">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-2"></div>
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* ID Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">{config.label}</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                    placeholder={config.placeholder}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In Securely'}
                        </button>
                    </form>

                    {/* DEMO HINT BOX */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-center">
                        <p className="font-bold mb-1 text-slate-800">🚀 Demo Credentials:</p>
                        <p>ID: <span className="font-mono text-blue-600">{config.demoUser}</span></p>
                        <p>Pass: <span className="font-mono text-blue-600">{config.demoPass}</span></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UniversalLogin;