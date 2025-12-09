import React from 'react';
import { Timer } from 'lucide-react';

const StudentTest = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 shadow-sm flex justify-between items-center rounded-xl mb-6">
                <div><p className="text-xs text-gray-400 font-bold">Question</p><p className="text-xl font-bold">01 / 15</p></div>
                <div className="bg-black text-white px-3 py-1 rounded-lg font-mono flex items-center gap-2"><Timer size={16} /> 19:42</div>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">What is the SI unit of Force?</h2>
            <div className="space-y-3">
                {['Pascal', 'Newton', 'Joule', 'Watt'].map((opt, i) => (
                    <div key={i} className="p-4 bg-white border border-gray-200 rounded-xl font-medium text-gray-700">{opt}</div>
                ))}
            </div>
            <button className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-xl font-bold">Next Question</button>
        </div>
    );
};
export default StudentTest;