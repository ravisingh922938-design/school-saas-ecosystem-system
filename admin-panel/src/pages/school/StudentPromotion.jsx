import React from 'react';
import { ArrowRight, Users, CheckSquare } from 'lucide-react';

const StudentPromotion = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Promote Students</h2>

            {/* Control Panel */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-gray-500">Promote From</label>
                    <div className="flex gap-2 mt-1">
                        <select className="border p-2 rounded-lg w-full bg-red-50 border-red-200">
                            <option>Class 9 - Section A</option>
                        </select>
                    </div>
                </div>

                <ArrowRight size={24} className="text-gray-400 mt-4" />

                <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-gray-500">Promote To (Next Session)</label>
                    <div className="flex gap-2 mt-1">
                        <select className="border p-2 rounded-lg w-full bg-green-50 border-green-200">
                            <option>Class 10 - Section A</option>
                        </select>
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold mt-4 md:mt-0 h-fit">
                    Promote All
                </button>
            </div>

            {/* Student Selection List */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h3 className="font-bold">Students List (Class 9-A)</h3>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Total: 40</span>
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 w-10"><input type="checkbox" checked /></th>
                            <th className="p-4">Roll No</th>
                            <th className="p-4">Student Name</th>
                            <th className="p-4">Exam Result</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((roll) => (
                            <tr key={roll} className="border-b hover:bg-gray-50">
                                <td className="p-4"><input type="checkbox" checked /></td>
                                <td className="p-4">240{roll}</td>
                                <td className="p-4 font-bold">Student Name {roll}</td>
                                <td className="p-4"><span className="text-green-600 font-bold">Pass (85%)</span></td>
                                <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Promoting</span></td>
                            </tr>
                        ))}
                        {/* Failed Student Example */}
                        <tr className="border-b bg-red-50">
                            <td className="p-4"><input type="checkbox" /></td>
                            <td className="p-4">2404</td>
                            <td className="p-4 font-bold text-red-900">Rohan Das</td>
                            <td className="p-4"><span className="text-red-600 font-bold">Fail (30%)</span></td>
                            <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Detained</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPromotion;