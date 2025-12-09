import React from 'react';
import { TrendingUp, DollarSign, ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react';

const FinanceManager = () => {
    // Dummy Data with Commission Logic
    const transactions = [
        { id: 'TXN-1001', school: 'Delhi Public School', type: 'Monthly Fee', amount: 2500, adminComm: 250, platformFee: 30, date: 'Today, 10:00 AM' },
        { id: 'TXN-1002', school: 'Sunshine Academy', type: 'Admission Fee', amount: 5000, adminComm: 1000, platformFee: 50, date: 'Today, 11:30 AM' },
        { id: 'TXN-1003', school: 'City Montessori', type: 'Exam Fee', amount: 500, adminComm: 50, platformFee: 10, date: 'Yesterday' },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Commission & Revenue Ledger</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
                    <p className="text-indigo-200 text-sm font-medium mb-1">Net Income (My Commission)</p>
                    <h3 className="text-3xl font-bold flex items-center gap-2">
                        ₹ 1,45,000 <TrendingUp className="text-green-400" size={24} />
                    </h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-slate-500 text-sm font-medium mb-1">Total Transaction Value</p>
                    <h3 className="text-3xl font-bold text-slate-800">₹ 12,50,000</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-slate-500 text-sm font-medium mb-1">Pending Payouts to Schools</p>
                    <h3 className="text-3xl font-bold text-red-600">₹ 8,20,000</h3>
                    <button className="text-xs text-blue-600 font-bold mt-2 hover:underline">Settle Now</button>
                </div>
            </div>

            {/* Ledger Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-700">Recent Transactions</h3>
                    <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border px-3 py-1.5 rounded-lg hover:bg-slate-50">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="p-4">Transaction ID</th>
                            <th className="p-4">School Name</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Total Paid by Parent</th>
                            <th className="p-4 text-green-600">My Commission</th>
                            <th className="p-4 text-indigo-600">Platform Charge</th>
                            <th className="p-4 text-right">School Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, idx) => (
                            <tr key={idx} className="border-b hover:bg-slate-50 transition">
                                <td className="p-4 font-mono text-xs">{txn.id}</td>
                                <td className="p-4 font-medium">{txn.school}</td>
                                <td className="p-4">{txn.type}</td>
                                <td className="p-4 font-bold">₹ {txn.amount + txn.platformFee}</td>

                                {/* COMMISSION LOGIC DISPLAY */}
                                <td className="p-4 font-bold text-green-600 bg-green-50">
                                    + ₹ {txn.adminComm}
                                </td>

                                {/* SURCHARGE LOGIC DISPLAY */}
                                <td className="p-4 font-bold text-indigo-600 bg-indigo-50">
                                    + ₹ {txn.platformFee}
                                </td>

                                {/* SCHOOL SHARE (Total - Comm - Platform) */}
                                <td className="p-4 text-right font-bold text-slate-700">
                                    ₹ {txn.amount - txn.adminComm}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinanceManager;