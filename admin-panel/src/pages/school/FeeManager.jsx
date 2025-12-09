import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Printer } from 'lucide-react';

const FeeManager = () => {
    const [activeTab, setActiveTab] = useState('collect');

    return (
        <div>
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button onClick={() => setActiveTab('collect')} className={`pb-3 px-4 font-bold ${activeTab === 'collect' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Fee Collection</button>
                <button onClick={() => setActiveTab('defaulters')} className={`pb-3 px-4 font-bold ${activeTab === 'defaulters' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}>Defaulters List</button>
            </div>

            {/* Tab 1: Collection */}
            {activeTab === 'collect' && (
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold mb-4">Collect Fees</h3>
                        <div className="flex gap-2 mb-6">
                            <input type="text" placeholder="Enter Student Name / Roll No" className="flex-1 border p-2 rounded-lg" />
                            <button className="bg-blue-600 text-white px-4 rounded-lg">Search</button>
                        </div>

                        {/* Student Details Context */}
                        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-blue-900">Arav Sharma (10-A)</h4>
                                <p className="text-xs text-blue-600">Pending Dues: ₹ 5,000</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Father: Rajesh Sharma</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" placeholder="Amount Paying" className="border p-2 rounded-lg" />
                            <select className="border p-2 rounded-lg"><option>Cash</option><option>Online/UPI</option><option>Cheque</option></select>
                        </div>
                        <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold flex justify-center gap-2">
                            <CheckCircle /> Confirm Payment
                        </button>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 h-fit">
                        <h3 className="font-bold mb-3">Recent Receipts</h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between text-sm border-b pb-2">
                                    <span>RCP-{1000 + i}</span>
                                    <span className="font-bold text-green-600">₹ 2,500</span>
                                    <Printer size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 2: Defaulters */}
            {activeTab === 'defaulters' && (
                <div className="bg-white rounded-xl shadow-sm border border-red-100">
                    <div className="p-4 bg-red-50 flex justify-between items-center">
                        <h3 className="font-bold text-red-700 flex items-center gap-2"><AlertCircle /> Fee Defaulters</h3>
                        <button className="bg-red-600 text-white text-xs px-3 py-2 rounded-lg">Send SMS to All</button>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr><th className="p-4">Student</th><th className="p-4">Class</th><th className="p-4">Due Amount</th><th className="p-4">Parent Phone</th><th className="p-4">Action</th></tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Rohan Kumar</td><td className="p-4">9-B</td><td className="p-4 text-red-600 font-bold">₹ 8,000</td><td className="p-4">9876543210</td>
                                <td className="p-4"><button className="text-blue-600 underline">Send Reminder</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FeeManager;