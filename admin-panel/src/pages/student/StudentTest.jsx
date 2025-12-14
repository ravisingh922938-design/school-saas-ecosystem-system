import React, { useState } from 'react';
import { Timer, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

const StudentTest = () => {
    const [activeScreen, setActiveScreen] = useState('list'); // list | test | result

    // --- SCREEN 1: LIST OF EXAMS ---
    if (activeScreen === 'list') {
        return (
            <div className="pb-24 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Online Exams 📝</h2>
                <div className="space-y-4">
                    <div className="bg-white border-l-4 border-green-500 p-5 rounded-2xl shadow-sm">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-lg">Science Weekly Test</h3>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">LIVE</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">20 Questions • 30 Mins</p>
                        <button onClick={() => setActiveScreen('test')} className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95 transition">
                            Start Test
                        </button>
                    </div>

                    {/* Upcoming */}
                    <div className="bg-white border-l-4 border-gray-300 p-5 rounded-2xl shadow-sm opacity-70">
                        <h3 className="font-bold text-lg">Maths Mock Test</h3>
                        <p className="text-sm text-gray-500 mt-1">Starts: Tomorrow, 10 AM</p>
                        <button disabled className="w-full mt-4 bg-gray-200 text-gray-500 py-3 rounded-xl font-bold cursor-not-allowed">
                            Upcoming
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- SCREEN 2: EXAM INTERFACE ---
    if (activeScreen === 'test') {
        return (
            <div className="h-screen bg-white flex flex-col font-sans">
                {/* Header with Timer */}
                <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
                    <div>
                        <h4 className="font-bold text-sm">Science Test</h4>
                        <p className="text-[10px] text-slate-400">Q. 1 / 20</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                        <Timer size={16} className="text-orange-400" />
                        <span className="font-mono font-bold text-lg">29:45</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <h3 className="text-lg font-bold text-gray-800 leading-relaxed mb-6">
                        Q1. What is the chemical formula of Water?
                    </h3>

                    <div className="space-y-3">
                        {['CO2', 'H2O', 'NaCl', 'O2'].map((opt, i) => (
                            <div key={i} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition">
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {String.fromCharCode(65 + i)}
                                </div>
                                <span className="font-medium text-gray-700">{opt}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="p-4 border-t bg-gray-50 flex justify-between">
                    <button onClick={() => setActiveScreen('list')} className="px-6 py-3 text-gray-500 font-bold">Exit</button>
                    <button onClick={() => setActiveScreen('result')} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-2">
                        Next <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        );
    }

    // --- SCREEN 3: RESULT ---
    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Test Submitted!</h2>
            <p className="text-gray-500 mt-2">Your responses have been recorded.</p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8 w-full">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Score</p>
                <h1 className="text-5xl font-black text-blue-600 my-2">18/20</h1>
                <p className="text-xs text-green-600 font-bold">Excellent Performance!</p>
            </div>

            <button onClick={() => setActiveScreen('list')} className="mt-10 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl w-full">
                Back to Exams
            </button>
        </div>
    );
};

export default StudentTest;