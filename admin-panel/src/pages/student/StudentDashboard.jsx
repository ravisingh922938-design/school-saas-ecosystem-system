import React from 'react';
import { Bell } from 'lucide-react';

const StudentDashboard = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div><h3 className="font-bold text-gray-800">Arav Sharma</h3><p className="text-xs text-gray-500">Class 10-A</p></div>
                <Bell className="text-gray-600" />
            </div>
            <div className="bg-red-500 p-5 rounded-3xl text-white shadow-lg shadow-red-200">
                <p className="text-red-100 text-xs font-bold uppercase">Payment Overdue</p>
                <h2 className="text-3xl font-extrabold">₹ 2,500</h2>
                <button className="mt-4 bg-white text-red-600 px-4 py-2 rounded-xl text-xs font-bold">Pay Now</button>
            </div>
        </div>
    );
};
export default StudentDashboard;