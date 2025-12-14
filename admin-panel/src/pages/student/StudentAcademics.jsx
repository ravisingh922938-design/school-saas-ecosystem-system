import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle, Clock, Download } from 'lucide-react';

const StudentAcademics = () => {
    const [activeTab, setActiveTab] = useState('homework');

    const homeworks = [
        { sub: "Maths", title: "Algebra Ex 4.2", due: "Tomorrow", status: "Pending", color: "bg-blue-100 text-blue-600" },
        { sub: "Science", title: "Physics Project", due: "15 Oct", status: "Submitted", color: "bg-green-100 text-green-600" },
        { sub: "English", title: "Poem Summary", due: "18 Oct", status: "Pending", color: "bg-orange-100 text-orange-600" },
    ];

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Page Title */}
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">Academics 📚</h2>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-200 rounded-xl mb-6">
                <button
                    onClick={() => setActiveTab('homework')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'homework' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                >
                    Homework
                </button>
                <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'notes' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                >
                    Study Notes
                </button>
            </div>

            {/* Homework List */}
            {activeTab === 'homework' && (
                <div className="space-y-4">
                    {homeworks.map((hw, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start active:scale-95 transition">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${hw.color}`}>
                                {hw.sub.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{hw.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <Clock size={12} /> Due: {hw.due}
                                </p>
                            </div>
                            {hw.status === 'Pending' ? (
                                <span className="text-[10px] font-bold bg-red-50 text-red-500 px-2 py-1 rounded-md">To Do</span>
                            ) : (
                                <CheckCircle size={20} className="text-green-500" />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Notes List */}
            {activeTab === 'notes' && (
                <div className="space-y-3">
                    {['Maths Formula Sheet', 'Physics Chapter 1', 'History Timeline'].map((note, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FileText className="text-indigo-500" size={20} />
                                <span className="text-sm font-medium text-gray-700">{note}</span>
                            </div>
                            <button className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200">
                                <Download size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default StudentAcademics;