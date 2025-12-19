import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, UserPlus, Users, BookOpen, IndianRupee,
    Bus, Settings, LogOut, Menu, Bell, ShoppingBag, X,
    Briefcase, CalendarCheck, FileText, Library, BedDouble,
    Layers, Megaphone, ClipboardList
} from 'lucide-react';

// ✅ CORRECT IMPORT
import { useSchoolTheme } from '/src/context/SchoolThemeContext';

const SchoolLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { theme } = useSchoolTheme();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- 📝 FIXED MENU LIST (No Duplicates) ---
    const menuItems = [
        { path: '/school', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/school/notices', name: 'Communication', icon: <Megaphone size={20} /> },
        { path: '/school/admission', name: 'Admission', icon: <UserPlus size={20} /> },
        { path: '/school/students', name: 'Student Info', icon: <Users size={20} /> },
        { path: '/school/staff', name: 'HR & Staff', icon: <Briefcase size={20} /> },
        { path: '/school/attendance', name: 'Attendance', icon: <CalendarCheck size={20} /> },
        { path: '/school/academics', name: 'Academics', icon: <ClipboardList size={20} /> },
        { path: '/school/exams', name: 'Exams & Results', icon: <FileText size={20} /> },
        { path: '/school/finance', name: 'Fee Management', icon: <IndianRupee size={20} /> },
        { path: '/school/library', name: 'Library', icon: <Library size={20} /> },
        { path: '/school/transport', name: 'Transport', icon: <Bus size={20} /> },
        { path: '/school/hostel', name: 'Hostel', icon: <BedDouble size={20} /> },
        { path: '/school/inventory', name: 'Inventory', icon: <Layers size={20} /> }, // ✅ Sirf ek bar hai ab
        { path: '/school/store', name: 'School Store', icon: <ShoppingBag size={20} /> },
        { path: '/school/settings', name: 'Settings', icon: <Settings size={20} /> },
    ];

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

            {/* MOBILE OVERLAY */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 text-white flex flex-col transition-transform duration-300 transform 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 shadow-2xl md:shadow-none h-full`}
                style={{ backgroundColor: theme.secondaryColor }}
            >
                <div className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-black/10">
                    <div className="flex items-center">
                        <img src={theme.logo} alt="Logo" className="w-8 h-8 object-contain bg-white rounded-lg p-1 mr-3" />
                        <div>
                            <h1 className="text-sm font-bold leading-tight truncate w-32">{theme.name}</h1>
                            <p className="text-[10px] opacity-70 uppercase tracking-wider">ERP Panel</p>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white/70 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                ? 'bg-white text-gray-900 shadow-md transform translate-x-1'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 bg-black/10 flex-shrink-0">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 hover:text-white rounded-xl transition">
                        <LogOut size={20} />
                        <span className="font-bold">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col w-full min-w-0">
                <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-4 md:px-6 shadow-sm z-10 sticky top-0 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                            <Menu size={24} style={{ color: theme.primaryColor }} />
                        </button>
                        <span className="font-bold text-lg text-gray-800 md:hidden">Menu</span>
                        <div className="hidden md:block">
                            <span className="text-sm font-medium text-gray-500 italic">"{theme.tagline || 'Excellence in Education'}"</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full cursor-pointer bg-gray-50 border border-gray-100 hover:bg-gray-100 transition relative">
                            <Bell size={20} style={{ color: theme.primaryColor }} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </div>
                        <img src={`https://ui-avatars.com/api/?name=${theme.name}&background=random`} className="w-9 h-9 rounded-full border-2 p-0.5" style={{ borderColor: theme.primaryColor }} alt="Profile" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 pb-24 md:pb-6 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SchoolLayout;