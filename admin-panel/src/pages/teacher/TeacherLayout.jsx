import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, BookOpen, User } from 'lucide-react';

const TeacherLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">

            {/* Mobile Container */}
            <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">

                {/* MAIN CONTENT (Scrollable) */}
                {/* pb-20 isliye taaki content bottom bar ke peeche na chupe */}
                <div className="pb-20 h-full overflow-y-auto">
                    <Outlet />
                </div>

                {/* BOTTOM NAVIGATION BAR (Fixed) */}
                <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center py-3 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] z-50">

                    <Link to="/teacher" className={`flex flex-col items-center gap-1 ${isActive('/teacher') ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
                        <Home size={24} />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>

                    <Link to="/teacher/attendance" className={`flex flex-col items-center gap-1 ${isActive('/teacher/attendance') ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
                        <CheckSquare size={24} />
                        <span className="text-[10px] font-bold">Attendance</span>
                    </Link>

                    <Link to="/teacher/homework" className={`flex flex-col items-center gap-1 ${isActive('/teacher/homework') ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
                        <BookOpen size={24} />
                        <span className="text-[10px] font-bold">Homework</span>
                    </Link>

                    <Link to="/teacher/profile" className={`flex flex-col items-center gap-1 ${isActive('/teacher/profile') ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
                        <User size={24} />
                        <span className="text-[10px] font-bold">Profile</span>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default TeacherLayout;