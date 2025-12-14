import React from 'react';
import { Save } from 'lucide-react';

const TeacherMarks = () => {
    const students = ["Arav Sharma", "Aditi Verma", "Rohan Singh", "Sneha Gupta"];

    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Marks Entry 📝</h2>
            <p className="text-sm text-gray-500 mb-6">Mid-Term Exam • Class 10-A • Maths</p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {students.map((std, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0">
                        <span className="font-bold text-gray-700">{std}</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="00"
                                className="w-16 p-2 text-center bg-gray-50 border border-gray-200 rounded-lg font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            <span className="text-xs text-gray-400">/ 100</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center gap-2 active:scale-95 transition">
                <Save size={20} /> Save Marks
            </button>

        </div>
    );
};

export default TeacherMarks;