import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, BookOpen, User, ClipboardList } from 'lucide-react';

const TeacherLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/teacher', name: 'Home', icon: <Home size={24} /> },
        { path: '/teacher/attendance', name: 'Attendance', icon: <CheckSquare size={24} /> },
        { path: '/teacher/homework', name: 'Homework', icon: <BookOpen size={24} /> },
        { path: '/teacher/marks', name: 'Marks', icon: <ClipboardList size={24} /> },
        { path: '/teacher/profile', name: 'Profile', icon: <User size={24} /> },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">

            {/* Main Content Area (Scrollable) */}
            <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
                <Outlet />
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-40 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 ${isActive(item.path)
                            ? 'text-teal-600 transform -translate-y-1'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <div className={`p-1 rounded-xl ${isActive(item.path) ? 'bg-teal-50' : 'bg-transparent'}`}>
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

export default TeacherLayout;