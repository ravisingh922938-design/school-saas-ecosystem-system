import React from 'react';
import { FileText, Download, PieChart } from 'lucide-react';

const ReportsManager = () => {
    const reports = [
        { name: 'Fee Defaulters Report', cat: 'Finance', date: 'Oct 2025' },
        { name: 'Monthly Attendance Log', cat: 'Attendance', date: 'Sept 2025' },
        { name: 'Class 10 Exam Results', cat: 'Academics', date: 'Term 1' },
        { name: 'Staff Payroll Sheet', cat: 'HR', date: 'Sept 2025' },
        { name: 'Expense Summary', cat: 'Finance', date: 'Yearly' },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Reports Center</h2>
                <div className="flex gap-2">
                    <select className="border p-2 rounded-lg text-sm"><option>This Month</option></select>
                    <select className="border p-2 rounded-lg text-sm"><option>All Categories</option></select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((rpt, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><FileText size={24} /></div>
                            <button className="text-gray-400 hover:text-blue-600"><Download size={20} /></button>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">{rpt.name}</h4>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span className="bg-gray-100 px-2 py-1 rounded">{rpt.cat}</span>
                            <span>{rpt.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsManager;