import React, { useState } from 'react';
import { Sparkles, FileText, Download, Save, Share2 } from 'lucide-react';

const TeacherPaperGen = () => {
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleGenerate = (e) => {
        e.preventDefault();
        setLoading(true);
        // Fake AI Delay
        setTimeout(() => {
            setLoading(false);
            setGenerated(true);
        }, 2000);
    };

    return (
        <div className="pb-24 p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gray-50 min-h-screen">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">AI Paper Gen 🤖</h2>
            </div>

            {!generated ? (
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-indigo-100">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles size={32} className="text-indigo-600 animate-pulse" />
                        </div>
                        <h3 className="font-bold text-gray-800">Create Exam in Seconds</h3>
                        <p className="text-xs text-gray-500">Enter topic, select class & difficulty.</p>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Subject & Topic</label>
                            <input type="text" placeholder="e.g. Physics - Thermodynamics" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Class</label>
                                <select className="w-full p-3 border rounded-xl bg-white"><option>10th</option><option>12th</option></select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Difficulty</label>
                                <select className="w-full p-3 border rounded-xl bg-white"><option>Medium</option><option>Hard</option></select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-1 block">No. of Questions</label>
                            <input type="range" min="5" max="50" defaultValue="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5</span><span>50</span></div>
                        </div>

                        <button disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-xl active:scale-95 transition flex justify-center items-center gap-2">
                            {loading ? 'Generating with AI...' : 'Generate Paper ✨'}
                        </button>
                    </form>
                </div>
            ) : (
                // RESULT VIEW
                <div className="space-y-4 animate-in zoom-in duration-300">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg text-center border-b pb-4 mb-4">Thermodynamics Test</h3>
                        <div className="space-y-4 text-sm text-gray-700">
                            <p><strong>Q1.</strong> What is the First Law of Thermodynamics?</p>
                            <p><strong>Q2.</strong> Define Entropy with an example.</p>
                            <p><strong>Q3.</strong> Calculate the work done in an isothermal process.</p>
                            <p className="text-gray-400 italic">... and 7 more questions</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white text-gray-800 py-3 rounded-xl font-bold shadow-sm border flex justify-center items-center gap-2">
                            <Save size={18} /> Save Draft
                        </button>
                        <button className="bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg flex justify-center items-center gap-2">
                            <Download size={18} /> Download PDF
                        </button>
                    </div>

                    <button onClick={() => setGenerated(false)} className="w-full text-gray-400 text-xs mt-4">Generate Another</button>
                </div>
            )}

        </div>
    );
};

export default TeacherPaperGen;