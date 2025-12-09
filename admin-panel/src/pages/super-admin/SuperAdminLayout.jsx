import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Building, Users, CreditCard, DollarSign, Percent,
    Send, MessageSquare, Tag, Globe, ToggleRight, Database,
    FileText, Settings, LogOut, Shield, BarChart2, Bell
} from 'lucide-react';

const SuperAdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        navigate('/');
    };

    const menuGroups = [
        {
            title: "OVERVIEW",
            items: [
                { path: '/super-admin', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                { path: '/super-admin/analytics', name: 'Analytics & Reports', icon: <BarChart2 size={20} /> },
            ]
        },
        {
            title: "MANAGEMENT",
            items: [
                { path: '/super-admin/schools', name: 'Manage Schools', icon: <Building size={20} /> },
                { path: '/super-admin/team', name: 'Internal Team', icon: <Users size={20} /> },
                { path: '/super-admin/subscriptions', name: 'Subscription Plans', icon: <CreditCard size={20} /> },
            ]
        },
        {
            title: "FINANCE & REVENUE",
            items: [
                { path: '/super-admin/finance', name: 'Finance Ledger', icon: <DollarSign size={20} /> },
                { path: '/super-admin/commission-rules', name: 'Commission Rules', icon: <Percent size={20} /> },
            ]
        },
        {
            title: "GROWTH & SUPPORT",
            items: [
                { path: '/super-admin/broadcast', name: 'Broadcast Alert', icon: <Send size={20} /> },
                { path: '/super-admin/support', name: 'Help Desk', icon: <MessageSquare size={20} /> },
                { path: '/super-admin/coupons', name: 'Coupons & Offers', icon: <Tag size={20} /> },
                { path: '/super-admin/cms', name: 'Website CMS', icon: <Globe size={20} /> },
            ]
        },
        {
            title: "SYSTEM & TECH",
            items: [
                { path: '/super-admin/integrations', name: 'Integrations', icon: <ToggleRight size={20} /> },
                { path: '/super-admin/backups', name: 'Database Backups', icon: <Database size={20} /> },
                { path: '/super-admin/logs', name: 'Audit Logs', icon: <FileText size={20} /> },
                { path: '/super-admin/settings', name: 'Global Settings', icon: <Settings size={20} /> },
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl h-full fixed left-0 top-0 z-50">
                <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3 shrink-0">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <Shield className="text-white" size={20} />
                    </div>
                    <div>
                        <span className="text-lg font-bold tracking-wide block">SchoolSaaS</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Super Admin</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                    {menuGroups.map((group, index) => (
                        <div key={index}>
                            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
                                {group.title}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${isActive(item.path)
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50 font-medium'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-red-600/90 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-medium"
                    >
                        <LogOut size={18} />
                        <span>Logout System</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col ml-64 min-w-0">
                <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 shadow-sm sticky top-0 z-40">
                    <h2 className="text-xl font-bold text-slate-800">
                        {menuGroups.flatMap(g => g.items).find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h2>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-700">SaaS Owner</p>
                                <p className="text-xs text-green-600">● Online</p>
                            </div>
                            <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg border border-indigo-200">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;