import React from 'react';
import { Mail, FileText, Bell, Printer } from 'lucide-react';

const CommManager = () => {
    return (
        <div className="space-y-8">
            {/* Notice Board */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Bell size={20} /> Digital Notice Board</h3>
                <textarea className="w-full border p-3 rounded-lg h-24 mb-3" placeholder="Type notice for students/parents..."></textarea>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Send SMS</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Send App Push</label>
                    <button className="ml-auto bg-indigo-600 text-white px-6 py-2 rounded-lg">Publish Notice</button>
                </div>
            </div>

            {/* Certificate Generator */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FileText size={20} /> Certificate Generator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Select Student</label>
                        <input type="text" placeholder="Roll No / Name" className="w-full border p-2 rounded-lg mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Certificate Type</label>
                        <select className="w-full border p-2 rounded-lg mt-1">
                            <option>Transfer Certificate (TC)</option>
                            <option>Character Certificate</option>
                            <option>Bonafide Certificate</option>
                        </select>
                    </div>
                    <button className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                        <Printer size={18} /> Generate & Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommManager;