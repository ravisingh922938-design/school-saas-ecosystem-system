import React from 'react';
import { DollarSign, Plus, FileText, TrendingDown } from 'lucide-react';

const ExpenseManager = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Add Expense Form */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 h-fit">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-red-600" /> Add Expense
                </h3>
                <form className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Expense Head</label>
                        <select className="w-full border p-2 rounded-lg mt-1">
                            <option>Electricity Bill</option>
                            <option>Building Maintenance</option>
                            <option>Staff Welfare</option>
                            <option>Stationery Purchase</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Amount (₹)</label>
                        <input type="number" className="w-full border p-2 rounded-lg mt-1" placeholder="5000" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Date</label>
                        <input type="date" className="w-full border p-2 rounded-lg mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Description</label>
                        <textarea className="w-full border p-2 rounded-lg mt-1" rows="2"></textarea>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Attach Bill/Invoice</label>
                        <input type="file" className="w-full border p-1 rounded-lg mt-1 text-xs" />
                    </div>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg font-bold">Record Expense</button>
                </form>
            </div>

            {/* Expense History */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Expense History</h3>
                    <div className="bg-red-50 text-red-700 px-3 py-1 rounded-lg font-bold text-sm">
                        Total: ₹ 45,200
                    </div>
                </div>

                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">Diesel for Generator</td>
                            <td className="p-3">Fuel</td>
                            <td className="p-3">20 Oct 2025</td>
                            <td className="p-3 font-bold text-red-600">₹ 2,500</td>
                            <td className="p-3"><FileText size={16} className="text-blue-500 cursor-pointer" /></td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">Water Cooler Repair</td>
                            <td className="p-3">Maintenance</td>
                            <td className="p-3">18 Oct 2025</td>
                            <td className="p-3 font-bold text-red-600">₹ 800</td>
                            <td className="p-3"><FileText size={16} className="text-blue-500 cursor-pointer" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ExpenseManager;