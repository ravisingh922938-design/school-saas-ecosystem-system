import React from 'react';
import { Sparkles, FileText, Download } from 'lucide-react';

const QuestionPaper = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white text-center mb-8 shadow-lg">
                <Sparkles size={48} className="mx-auto mb-4 text-yellow-300" />
                <h2 className="text-3xl font-bold mb-2">AI Paper Generator</h2>
                <p className="text-purple-100">Create exam papers in seconds using Artificial Intelligence.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Class</label>
                        <select className="w-full border p-3 rounded-lg mt-1"><option>Class 10</option></select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                        <select className="w-full border p-3 rounded-lg mt-1"><option>Science</option></select>
                    </div>
                    <div className="col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Topics / Chapters</label>
                        <input type="text" placeholder="e.g. Light, Electricity, Human Eye" className="w-full border p-3 rounded-lg mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Difficulty</label>
                        <select className="w-full border p-3 rounded-lg mt-1"><option>Medium</option><option>Hard</option></select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Total Marks</label>
                        <input type="number" defaultValue="50" className="w-full border p-3 rounded-lg mt-1" />
                    </div>
                </div>

                <button className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-800 transition">
                    <Sparkles size={20} /> Generate Paper
                </button>
            </div>

            {/* Generated Preview (Dummy) */}
            <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 opacity-50 cursor-not-allowed">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-400">Preview (Generated Paper)</h3>
                    <Download size={20} className="text-gray-400" />
                </div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPaper;