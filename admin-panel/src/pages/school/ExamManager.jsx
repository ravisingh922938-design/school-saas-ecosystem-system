import React from 'react';
import { ClipboardList, Printer } from 'lucide-react';

const ExamManager = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Exams & Results</h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold mb-4">Exam Schedule</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                            <span>Mid-Term Math</span>
                            <span className="font-bold">25 Oct</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                            <span>Mid-Term Science</span>
                            <span className="font-bold">27 Oct</span>
                        </div>
                    </div>
                    <button className="mt-4 text-blue-600 text-sm font-bold">+ Add Exam</button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold mb-4">Report Card Generator</h3>
                    <select className="w-full border p-2 rounded-lg mb-3"><option>Select Class</option></select>
                    <select className="w-full border p-2 rounded-lg mb-3"><option>Select Exam (Mid-Term)</option></select>
                    <button className="bg-indigo-600 text-white w-full py-2 rounded-lg flex justify-center gap-2">
                        <Printer size={18} /> Print All Report Cards
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamManager;