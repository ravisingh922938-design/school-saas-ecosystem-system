import React from 'react';
import { Download } from 'lucide-react';

const StudentResults = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Exam Results</h2>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-8 border-orange-100 flex items-center justify-center mb-4">
                    <div className="text-center">
                        <div className="text-3xl font-extrabold text-orange-600">85%</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">Grade A</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t pt-4 text-xs">
                    <div><p className="text-gray-400">Total</p><p className="font-bold">425/500</p></div>
                    <div><p className="text-gray-400">Rank</p><p className="font-bold">5th</p></div>
                    <div><p className="text-gray-400">Result</p><p className="text-green-600 font-bold">PASS</p></div>
                </div>
            </div>
            <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Download size={18} /> Download Report Card
            </button>
        </div>
    );
};
export default StudentResults;