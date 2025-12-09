import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';

// API Base URL (Localhost ya Live)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const UniversalLogin = () => {
    const { role } = useParams();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [inputId, setInputId] = useState('');
    const [password, setPassword] = useState('');

    // Config based on Role
    const config = {
        'super-admin': { title: 'Super Admin', label: 'Admin Email', placeholder: 'admin@saas.com' },
        'school': { title: 'Principal', label: 'School Email', placeholder: 'principal@school.com' },
        'teacher': { title: 'Teacher', label: 'Email / Emp ID', placeholder: 'T-2025-001' },
        'student': { title: 'Student', label: 'Enrollment ID', placeholder: 'DPS-2025-0001' }, // ✅ New ID Format
    }[role] || { title: 'Login', label: 'Username' };

    // --- REAL LOGIN LOGIC ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Backend ko Data bhejo
            const { data } = await axios.post(`${API_URL}/auth/login`, {
                role,           // super-admin, school, etc.
                identifier: inputId, // Email ya Enrollment ID
                password: password
            });

            // 2. Success: Token Save karo
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // 3. Sahi Dashboard par bhejo
                if (role === 'super-admin') navigate('/super-admin');
                else if (role === 'school') navigate('/school');
                else if (role === 'teacher') navigate('/teacher');
                else if (role === 'student') navigate('/student');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login Failed! Check details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

                <Link to="/select-role" className="text-sm text-gray-400 hover:text-blue-600 mb-6 inline-flex items-center gap-1">
                    <ArrowLeft size={16} /> Back
                </Link>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">{config.title} Login</h2>
                <p className="text-gray-500 mb-6">Enter credentials to access dashboard.</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{config.label}</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={config.placeholder}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2 disabled:bg-blue-400"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Secure Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UniversalLogin;