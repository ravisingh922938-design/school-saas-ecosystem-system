import React from 'react';
import { CreditCard, History, Download, CheckCircle, AlertCircle } from 'lucide-react';

const StudentFees = () => {
    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">Fee Payment 💳</h2>

            {/* Due Card */}
            <div className="bg-white border border-red-100 p-6 rounded-[1.5rem] shadow-lg shadow-red-50 mb-8">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertCircle size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">Payment Overdue</span>
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-1">₹ 2,500</h1>
                <p className="text-gray-500 text-sm mb-6">Tuition Fee (Oct - Dec)</p>

                <button className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 active:scale-95 transition">
                    PAY NOW
                </button>
            </div>

            {/* History */}
            <h3 className="font-bold text-gray-800 mb-4 px-1 flex items-center gap-2">
                <History size={18} /> Payment History
            </h3>

            <div className="space-y-3">
                {[
                    { month: "Sep Fee", date: "10 Sep", amount: "2,500" },
                    { month: "Aug Fee", date: "05 Aug", amount: "2,500" },
                    { month: "Admission", date: "01 Apr", amount: "15,000" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                <CheckCircle size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{item.month}</h4>
                                <p className="text-xs text-gray-400">Paid on {item.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-900">₹{item.amount}</p>
                            <button className="text-[10px] text-blue-600 font-bold flex items-center gap-1 mt-1">
                                <Download size={10} /> Receipt
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StudentFees;