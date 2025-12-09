import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, BookOpen, Award } from 'lucide-react';

const StudentLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">

            {/* Mobile Container */}
            <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">

                {/* MAIN CONTENT */}
                <div className="pb-20 h-full overflow-y-auto">
                    <Outlet />
                </div>

                {/* BOTTOM NAVIGATION BAR */}
                <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center py-3 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] z-50">

                    <Link to="/student" className={`flex flex-col items-center gap-1 ${isActive('/student') ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
                        <Home size={24} />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>

                    <Link to="/student/fees" className={`flex flex-col items-center gap-1 ${isActive('/student/fees') ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
                        <CreditCard size={24} />
                        <span className="text-[10px] font-bold">Fees</span>
                    </Link>

                    <Link to="/student/homework" className={`flex flex-col items-center gap-1 ${isActive('/student/homework') ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
                        <BookOpen size={24} />
                        <span className="text-[10px] font-bold">Work</span>
                    </Link>

                    <Link to="/student/results" className={`flex flex-col items-center gap-1 ${isActive('/student/results') ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
                        <Award size={24} />
                        <span className="text-[10px] font-bold">Result</span>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default StudentLayout;