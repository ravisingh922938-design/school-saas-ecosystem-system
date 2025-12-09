import React from 'react';
import { Users, BookOpen, IndianRupee, Bell, Search, Menu } from 'lucide-react';

const SchoolDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Menu className="text-gray-500 md:hidden" />
                    <div className="text-xl font-bold text-blue-700">Galaxy Public School</div>
                </div>
                <div className="flex items-center gap-4">
                    <Bell size={20} className="text-gray-600" />
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">P</div>
                </div>
            </header>

            <div className="p-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">School Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <span className="text-gray-500 font-medium">Total Students</span>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mt-2">1,240</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <span className="text-gray-500 font-medium">Fees Collected</span>
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><IndianRupee size={20} /></div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mt-2">₹ 4.5 L</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SchoolDashboard;