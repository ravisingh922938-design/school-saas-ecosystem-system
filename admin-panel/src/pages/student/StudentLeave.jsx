import React from 'react';
import { Plus, Calendar, CheckCircle, Clock } from 'lucide-react';

const StudentLeave = () => {
    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-2xl font-extrabold text-gray-800">Leave Request</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1 active:scale-95 transition">
                    <Plus size={16} /> New Request
                </button>
            </div>

            <div className="space-y-4">
                {/* Pending Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-yellow-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl">PENDING</div>
                    <h3 className="font-bold text-gray-800">Sick Leave (Fever)</h3>
                    <p className="text-xs text-gray-500 mt-1">15 Oct - 17 Oct (3 Days)</p>
                    <div className="mt-3 flex gap-2">
                        <span className="p-2 bg-gray-50 rounded-full"><Clock size={16} className="text-yellow-500" /></span>
                        <p className="text-xs text-gray-400 self-center">Awaiting Teacher's approval</p>
                    </div>
                </div>

                {/* Approved Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 opacity-80">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-800">Family Function</h3>
                            <p className="text-xs text-gray-500 mt-1">01 Sep - 02 Sep (2 Days)</p>
                        </div>
                        <CheckCircle size={20} className="text-green-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLeave;