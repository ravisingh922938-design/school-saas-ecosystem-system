import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    Home, BookOpen, PieChart, Grid, Bell
} from 'lucide-react';

const StudentLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // --- BOTTOM NAVIGATION ITEMS ---
    const navItems = [
        { path: '/student', name: 'Home', icon: <Home size={24} /> },
        { path: '/student/academics', name: 'Learn', icon: <BookOpen size={24} /> },
        { path: '/student/results', name: 'Exam', icon: <PieChart size={24} /> },
        { path: '/student/menu', name: 'Menu', icon: <Grid size={24} /> },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

            {/* 1. TOP HEADER (Fixed & Glass Effect) */}
            <header className="bg-white/90 backdrop-blur-md px-5 py-3 flex justify-between items-center shadow-sm sticky top-0 z-30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-0.5 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full shadow-md">
                        <img src="https://ui-avatars.com/api/?name=Aryan&background=fff" className="w-9 h-9 rounded-full border-2 border-white" alt="Student" />
                    </div>
                    <div>
                        <h1 className="text-sm font-extrabold text-gray-800 leading-none">Hi, Aryan 👋</h1>
                        <p className="text-[10px] text-gray-500 font-bold mt-0.5 bg-gray-100 px-2 py-0.5 rounded-full inline-block">Class 10-A</p>
                    </div>
                </div>

                {/* Notification Bell */}
                <div className="p-2.5 bg-gray-50 rounded-full text-gray-600 relative cursor-pointer active:scale-90 transition">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </div>
            </header>

            {/* 2. MAIN CONTENT AREA (Scrollable) */}
            <main className="flex-1 overflow-y-auto pb-24 p-4 scrollbar-hide bg-gray-50/50">
                <Outlet />
            </main>

            {/* 3. BOTTOM NAVIGATION BAR (Fixed & App Style) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-40 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 ${isActive(item.path)
                            ? 'text-orange-600'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {/* Icon Container */}
                        <div className={`p-1 rounded-xl ${isActive(item.path) ? 'bg-orange-50' : 'bg-transparent'}`}>
                            {item.icon}
                        </div>

                        <span className={`text-[10px] ${isActive(item.path) ? 'font-bold' : 'font-medium'}`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default StudentLayout;