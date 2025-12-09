import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, UserPlus, Users, BookOpen, IndianRupee,
    Bus, Settings, LogOut, GraduationCap, Library, ClipboardList,
    Package, Phone, UserCheck, Home, Video, Mail, Calendar,
    ShoppingBag, Sparkles, UploadCloud, FileText, ShieldCheck
} from 'lucide-react';

const SchoolLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Full Menu List based on 29 Features
    const menuItems = [
        { path: '/school', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/school/students', name: 'Student Info', icon: <Users size={20} /> },
        { path: '/school/staff', name: 'HR & Staff', icon: <UserPlus size={20} /> },
        { path: '/school/academics', name: 'Academics', icon: <BookOpen size={20} /> },
        { path: '/school/exams', name: 'Exams & Results', icon: <ClipboardList size={20} /> },
        { path: '/school/fees', name: 'Fee Management', icon: <IndianRupee size={20} /> },
        { path: '/school/transport', name: 'Transport', icon: <Bus size={20} /> },
        { path: '/school/library', name: 'Library', icon: <Library size={20} /> },
        { path: '/school/teachers', name: 'Teachers', icon: <Users size={20} /> },

        // New Features Icons
        { path: '/school/inventory', name: 'Inventory', icon: <Package size={20} /> }, // Ye wala missing tha
        { path: '/school/front-office', name: 'Front Office', icon: <Phone size={20} /> },
        { path: '/school/attendance', name: 'Attendance', icon: <UserCheck size={20} /> },
        { path: '/school/hostel', name: 'Hostel', icon: <Home size={20} /> },
        { path: '/school/lms', name: 'LMS & Classes', icon: <Video size={20} /> },
        { path: '/school/communication', name: 'Communication', icon: <Mail size={20} /> },
        { path: '/school/events', name: 'Events', icon: <Calendar size={20} /> },
        { path: '/school/store', name: 'School Store', icon: <ShoppingBag size={20} /> },
        { path: '/school/paper-generator', name: 'AI Paper Gen', icon: <Sparkles size={20} /> },
        { path: '/school/import', name: 'Bulk Import', icon: <UploadCloud size={20} /> },
        { path: '/school/reports', name: 'Reports', icon: <FileText size={20} /> },
        { path: '/school/gate-pass', name: 'Gate Pass', icon: <ShieldCheck size={20} /> },

        { path: '/school/settings', name: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-100 gap-2 shrink-0">
                    <GraduationCap className="text-blue-600" />
                    <span className="text-lg font-bold text-gray-800">School ERP</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive(item.path)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 shrink-0">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-6 shadow-sm z-10 shrink-0">
                    <div className="font-semibold text-gray-700">Galaxy Public School</div>
                    <div className="flex items-center gap-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-700">Principal</p>
                            <p className="text-xs text-green-600">● Active</p>
                        </div>
                        <img src="https://ui-avatars.com/api/?name=Principal" className="w-9 h-9 rounded-full border" alt="Profile" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SchoolLayout;