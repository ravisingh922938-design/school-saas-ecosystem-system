import React from 'react';
import { Save, Image, ToggleLeft } from 'lucide-react';

const SchoolSettings = () => {
    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">School Configuration</h2>

            <div className="bg-white p-8 rounded-xl border border-gray-200 space-y-8">

                {/* General Info */}
                <div>
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">General Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500">School Name</label>
                            <input type="text" defaultValue="Galaxy Public School" className="w-full border p-2 rounded-lg mt-1" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500">School Code</label>
                            <input type="text" defaultValue="GPS-DEL-01" className="w-full border p-2 rounded-lg mt-1 bg-gray-50" disabled />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500">Address</label>
                            <input type="text" defaultValue="12, Civil Lines, New Delhi" className="w-full border p-2 rounded-lg mt-1" />
                        </div>
                    </div>
                </div>

                {/* Academic Session */}
                <div>
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Academic Settings</h3>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="font-bold">Current Session</p>
                            <p className="text-xs text-gray-500">All data will be saved under this year.</p>
                        </div>
                        <select className="border p-2 rounded-lg bg-white font-bold text-blue-600">
                            <option>2025-2026</option>
                            <option>2024-2025</option>
                        </select>
                    </div>
                </div>

                {/* Modules Toggle */}
                <div>
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Modules Control</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Enable Online Fee Payment</span>
                            <ToggleLeft size={32} className="text-green-500 cursor-pointer" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Enable SMS Notifications</span>
                            <ToggleLeft size={32} className="text-green-500 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Save size={18} /> Save Changes
                </button>

            </div>
        </div>
    );
};

export default SchoolSettings;