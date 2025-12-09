import React, { useState } from 'react';
import { Book, Clock, Layers, Plus } from 'lucide-react';

const AcademicManager = () => {
    const [activeTab, setActiveTab] = useState('classes');

    return (
        <div>
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button onClick={() => setActiveTab('classes')} className={`pb-3 px-4 font-bold ${activeTab === 'classes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Class & Sections</button>
                <button onClick={() => setActiveTab('subjects')} className={`pb-3 px-4 font-bold ${activeTab === 'subjects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Subjects</button>
                <button onClick={() => setActiveTab('timetable')} className={`pb-3 px-4 font-bold ${activeTab === 'timetable' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Class Timetable</button>
            </div>

            {/* 1. Class & Sections */}
            {activeTab === 'classes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><Layers size={20} /> Add New Class</h3>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Class Name (e.g. Class 10)" className="border p-2 rounded-lg flex-1" />
                            <input type="text" placeholder="Sections (A,B,C)" className="border p-2 rounded-lg w-1/3" />
                            <button className="bg-indigo-600 text-white px-4 rounded-lg">Save</button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold mb-4">Class List</h3>
                        <ul className="space-y-2">
                            {['Class 10 (A, B)', 'Class 9 (A, B, C)', 'Class 8 (A)'].map((cls, idx) => (
                                <li key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <span>{cls}</span>
                                    <button className="text-blue-600 text-xs font-bold">Edit</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* 2. Subjects */}
            {activeTab === 'subjects' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold">Subject List</h3>
                        <button className="text-blue-600 text-sm flex items-center gap-1"><Plus size={16} /> Add Subject</button>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50"><tr><th className="p-3">Subject Name</th><th className="p-3">Code</th><th className="p-3">Type</th></tr></thead>
                        <tbody>
                            <tr className="border-b"><td className="p-3">Mathematics</td><td className="p-3">MATH101</td><td className="p-3"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">Theory</span></td></tr>
                            <tr className="border-b"><td className="p-3">Physics Lab</td><td className="p-3">PHYLAB</td><td className="p-3"><span className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs">Practical</span></td></tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* 3. Timetable */}
            {activeTab === 'timetable' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex gap-4 mb-6">
                        <select className="border p-2 rounded-lg"><option>Class 10</option></select>
                        <select className="border p-2 rounded-lg"><option>Section A</option></select>
                        <button className="bg-blue-600 text-white px-4 rounded-lg text-sm">Load Schedule</button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        <div className="font-bold text-gray-500 bg-gray-100 p-2 rounded">Mon</div>
                        <div className="bg-blue-50 text-blue-700 p-2 rounded border border-blue-100">Math<br /><span className="text-xs text-gray-500">09:00 AM</span></div>
                        <div className="bg-green-50 text-green-700 p-2 rounded border border-green-100">Eng<br /><span className="text-xs text-gray-500">10:00 AM</span></div>
                        <div className="bg-gray-50 p-2 rounded text-gray-400">Break</div>
                        <div className="bg-purple-50 text-purple-700 p-2 rounded border border-purple-100">Science<br /><span className="text-xs text-gray-500">11:30 AM</span></div>
                        {/* ... other days */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicManager;