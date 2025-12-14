import React from 'react';
import { Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

const TeacherLeaves = () => {
    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">My Leaves 🤒</h2>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1 active:scale-95 transition">
                    <Plus size={16} /> Apply New
                </button>
            </div>

            {/* Leave Balance */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-800 text-center border border-blue-100">
                    <h3 className="text-3xl font-black">08</h3>
                    <p className="text-xs font-bold uppercase">Casual Leaves</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-2xl text-pink-800 text-center border border-pink-100">
                    <h3 className="text-3xl font-black">04</h3>
                    <p className="text-xs font-bold uppercase">Medical Leaves</p>
                </div>
            </div>

            {/* Leave History */}
            <h3 className="font-bold text-gray-700 mb-4">Recent Applications</h3>
            <div className="space-y-4">

                {/* Pending */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-gray-800">Personal Work</h4>
                            <p className="text-xs text-gray-500 mt-1">15 Oct - 16 Oct (2 Days)</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded">PENDING</span>
                    </div>
                </div>

                {/* Approved */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-500 opacity-80">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-gray-800">Sick Leave</h4>
                            <p className="text-xs text-gray-500 mt-1">01 Sep (1 Day)</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                            <CheckCircle size={14} /> Approved
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeacherLeaves;