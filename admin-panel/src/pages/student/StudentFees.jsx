import React from 'react';
import { CreditCard, History, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentFees = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Fee Payment</h2>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-red-100 mb-8">
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Outstanding</p>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">₹ 2,500</h1>
                <Link to="/student/pay">
                    <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-blue-200 shadow-xl">
                        <CreditCard size={18} /> Pay via UPI / Card
                    </button>
                </Link>
            </div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><History size={18} /> History</h3>
            <div className="bg-white p-4 rounded-xl flex justify-between items-center border border-gray-50">
                <div><p className="font-bold text-gray-800">Sept Fee</p><p className="text-xs text-gray-400">Paid: 05 Sep</p></div>
                <button className="text-[10px] text-blue-500 flex items-center gap-1 border px-2 py-1 rounded"><Download size={10} /> Receipt</button>
            </div>
        </div>
    );
};
export default StudentFees;