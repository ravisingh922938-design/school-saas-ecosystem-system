import React from 'react';
import { Upload, CheckCircle, Clock } from 'lucide-react';

const StudentHomework = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Homework Diary</h2>

            <div className="space-y-4">
                {/* Pending Homework */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">MATH</span>
                        <span className="text-xs text-red-500 font-bold flex items-center gap-1"><Clock size={12} /> Due Tomorrow</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">Algebra Worksheet 4.2</h3>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Complete Q1 to Q10 in notebook and upload photo.</p>

                    <button className="w-full border border-blue-600 text-blue-600 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:bg-blue-50">
                        <Upload size={16} /> Upload Answer
                    </button>
                </div>

                {/* Completed Homework */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 opacity-75">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded">SCIENCE</span>
                        <span className="text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle size={12} /> Submitted</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">Physics Lab Report</h3>
                    <p className="text-xs text-gray-500 mt-1">Submitted on 28 Oct</p>
                </div>
            </div>
        </div>
    );
};
export default StudentHomework;