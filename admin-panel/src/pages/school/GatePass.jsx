import React from 'react';
import { ShieldCheck, User, Clock } from 'lucide-react';

const GatePass = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Create Pass */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ShieldCheck size={20} /> Generate Gate Pass</h3>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="type" defaultChecked /> Visitor</label>
                        <label className="flex items-center gap-2"><input type="radio" name="type" /> Student Out</label>
                    </div>
                    <input type="text" placeholder="Name" className="w-full border p-2 rounded-lg" />
                    <input type="text" placeholder="Purpose / Reason" className="w-full border p-2 rounded-lg" />
                    <input type="text" placeholder="Meeting Whom?" className="w-full border p-2 rounded-lg" />
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg font-bold">Print Pass</button>
                </div>
            </div>

            {/* Active Passes Log */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Active Visitors (Inside Campus)</h3>
                <div className="space-y-3">
                    <div className="p-3 border border-red-200 bg-red-50 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full border"><User size={16} /></div>
                            <div>
                                <p className="font-bold text-sm">Ramesh Kumar</p>
                                <p className="text-xs text-gray-500">Meeting Principal</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-red-600 flex items-center gap-1"><Clock size={12} /> In: 10:30 AM</p>
                            <button className="text-xs text-blue-600 underline mt-1">Mark Exit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GatePass;