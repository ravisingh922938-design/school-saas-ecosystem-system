import React from 'react';
import { Plus, FileText, Clock } from 'lucide-react';

const TeacherHomework = () => {
    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Homework 📚</h2>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1 active:scale-95 transition">
                    <Plus size={16} /> Create New
                </button>
            </div>

            <div className="space-y-4">
                {[
                    { class: "10-A", sub: "Maths", title: "Algebra Ex 4.2", due: "Tomorrow" },
                    { class: "9-B", sub: "Science", title: "Draw Plant Cell", due: "15 Oct" }
                ].map((hw, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-teal-50 text-teal-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            {hw.class}
                        </div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{hw.sub}</h4>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{hw.title}</h3>

                        <div className="flex justify-between items-center mt-4 border-t border-gray-50 pt-3">
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock size={14} /> Due: {hw.due}
                            </p>
                            <span className="text-teal-600 text-xs font-bold">View Submissions</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherHomework;