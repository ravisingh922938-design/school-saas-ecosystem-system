import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, UserCheck, GraduationCap, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

const RoleSelection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isNativeApp = Capacitor.isNativePlatform();

    // Roles Data
    const roles = [
        {
            id: 'school',
            title: 'Principal',
            icon: <Building size={32} />,
            color: 'bg-blue-500',
            shadow: 'shadow-blue-500/50',
            delay: 0.1
        },
        {
            id: 'teacher',
            title: 'Teacher',
            icon: <UserCheck size={32} />,
            color: 'bg-green-500',
            shadow: 'shadow-green-500/50',
            delay: 0.2
        },
        {
            id: 'student',
            title: 'Student',
            icon: <GraduationCap size={32} />,
            color: 'bg-orange-500',
            shadow: 'shadow-orange-500/50',
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Animated Background Blobs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
            />

            {/* Main Content */}
            <div className="z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mb-6">
                        SchoolOS
                    </h1>
                    <p className="text-blue-100/80 text-lg mb-12 max-w-md mx-auto">
                        The next generation operating system for your educational journey.
                    </p>
                </motion.div>

                {/* THE MAIN TRIGGER BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-white/10 font-lg rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    <span className="mr-2">Enter Portal</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                    {/* Pulse Effect */}
                    <span className="absolute -inset-1 rounded-full border border-white/30 animate-ping opacity-20"></span>
                </motion.button>
            </div>

            {/* POPUP OVERLAY (Modal) */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* The Colorful Card Container */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2rem] p-8 shadow-2xl z-50 m-0 sm:m-4"
                        >

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800">Who are you?</h2>
                                <p className="text-gray-500 text-sm">Select your profile to continue</p>
                            </div>

                            {/* Roles Buttons (Staggered Animation) */}
                            <div className="space-y-4">
                                {roles.map((role) => (
                                    <Link to={`/login/${role.id}`} key={role.id} className="block">
                                        <motion.div
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: role.delay }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`flex items-center p-4 rounded-2xl ${role.color} text-white shadow-lg ${role.shadow} cursor-pointer relative overflow-hidden group`}
                                        >
                                            {/* Shine Effect */}
                                            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-500" />

                                            <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                                                {role.icon}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="font-bold text-lg">{role.title}</h3>
                                                <p className="text-white/80 text-xs">Click to Login</p>
                                            </div>
                                            <ChevronRight className="text-white/70" />
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>

                            {/* Super Admin Link (Hidden for App) */}
                            {!isNativeApp && (
                                <div className="mt-6 text-center">
                                    <Link to="/login/super-admin" className="text-xs text-gray-400 hover:text-blue-600 underline">
                                        Are you the Super Admin?
                                    </Link>
                                </div>
                            )}

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default RoleSelection;