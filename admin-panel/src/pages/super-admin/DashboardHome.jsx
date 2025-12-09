import React from 'react';
import { TrendingUp, Users, School, AlertCircle } from 'lucide-react';

const DashboardHome = () => {
    const stats = [
        { label: 'Total Revenue (Monthly)', value: '₹ 45.2 Lakhs', icon: <TrendingUp />, color: 'bg-green-500', trend: '+12% vs last month' },
        { label: 'Active Schools', value: '124', icon: <School />, color: 'bg-indigo-500', trend: '5 New this week' },
        { label: 'Total Users (Global)', value: '15,400', icon: <Users />, color: 'bg-blue-500', trend: 'Students + Teachers' },
        { label: 'Pending KYC', value: '3 Schools', icon: <AlertCircle />, color: 'bg-orange-500', trend: 'Action Required' },
    ];

    return (
        <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg shadow-indigo-100`}>
                                {stat.icon}
                            </div>
                            <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Health & Map Section Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 flex flex-col justify-center items-center text-slate-400">
                    <p>Revenue Chart Component will come here</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 flex flex-col justify-center items-center text-slate-400">
                    <p>Server Health & Database Status Logs</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;