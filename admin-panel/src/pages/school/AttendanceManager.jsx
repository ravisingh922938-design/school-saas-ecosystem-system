import React from 'react';
import { Calendar, UserCheck, XCircle } from 'lucide-react';

const AttendanceManager = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Register */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-lg">Student Attendance (Class 10-A)</h3>
                    <input type="date" className="border rounded p-1" />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((roll) => (
                        <div key={roll} className="text-center">
                            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-sm cursor-pointer border-2 ${roll === 4 ? 'bg-red-50 border-red-500 text-red-600' : 'bg-green-50 border-green-500 text-green-600'}`}>
                                {roll}
                            </div>
                            <p className="text-xs mt-1 text-gray-500">Roll {roll}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Save & Send SMS</button>
                </div>
            </div>

            {/* Staff Stats */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Staff Today</h3>
                <div className="space-y-4">
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-green-700 font-bold">Present</span>
                        <span className="font-bold text-xl">42</span>
                    </div>
                    <div className="flex justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-red-700 font-bold">Absent</span>
                        <span className="font-bold text-xl">3</span>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-bold mb-2">Leave Requests</h4>
                        <div className="text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                            <p><strong>Rahul Sir (Math)</strong>: Sick Leave</p>
                            <div className="flex gap-2 mt-2">
                                <button className="bg-green-600 text-white px-2 py-1 rounded">Approve</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceManager;