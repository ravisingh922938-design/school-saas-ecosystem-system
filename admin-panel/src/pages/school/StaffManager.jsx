import React from 'react';
import { DollarSign, UserCheck, Calendar } from 'lucide-react';

const StaffManager = () => {
    const staff = [
        { id: 1, name: 'Rahul Verma', role: 'Math Teacher', salary: 45000, status: 'Present' },
        { id: 2, name: 'Sita Devi', role: 'Science Teacher', salary: 42000, status: 'On Leave' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">HR & Payroll</h2>

            {/* Staff Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr><th className="p-4">Name</th><th className="p-4">Role</th><th className="p-4">Base Salary</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
                    </thead>
                    <tbody>
                        {staff.map((s) => (
                            <tr key={s.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-bold">{s.name}</td>
                                <td className="p-4">{s.role}</td>
                                <td className="p-4">₹ {s.salary}</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${s.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{s.status}</span></td>
                                <td className="p-4"><button className="text-blue-600 text-xs font-bold border border-blue-200 px-2 py-1 rounded hover:bg-blue-50">View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Payroll Generator */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><DollarSign size={20} className="text-green-600" /> Payroll Processor</h3>
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500">Select Month</label>
                        <input type="month" className="w-full border p-2 rounded-lg mt-1" />
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2">
                        Calculate & Generate Payslips
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffManager;