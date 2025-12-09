import React from 'react';
import { Upload, Camera, Link } from 'lucide-react';

const TeacherHomework = () => {
    return (
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Create Homework</h2>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">

                {/* Class Selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Class</label>
                    <select className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none font-medium">
                        <option>Class 10-A (Maths)</option>
                        <option>Class 9-B (Science)</option>
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                    <input type="text" placeholder="e.g. Algebra Worksheet 2" className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none" />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Instructions</label>
                    <textarea rows="3" placeholder="Write details here..." className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none"></textarea>
                </div>

                {/* Attachments */}
                <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold flex flex-col items-center gap-1">
                        <Camera size={20} /> <span className="text-xs">Camera</span>
                    </button>
                    <button className="flex-1 py-3 bg-purple-50 text-purple-600 rounded-xl font-bold flex flex-col items-center gap-1">
                        <Upload size={20} /> <span className="text-xs">Upload PDF</span>
                    </button>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200">
                    Assign Homework
                </button>

            </div>
        </div>
    );
};

export default TeacherHomework;