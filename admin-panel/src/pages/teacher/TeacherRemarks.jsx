import React, { useState } from 'react';
import { Star, Frown, ThumbsUp, MessageSquare, CheckCircle } from 'lucide-react';

const TeacherRemarks = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        { id: 1, name: "Arav Sharma", roll: 1, img: "https://ui-avatars.com/api/?name=Arav" },
        { id: 2, name: "Aditi Verma", roll: 2, img: "https://ui-avatars.com/api/?name=Aditi" },
        { id: 3, name: "Rohan Singh", roll: 3, img: "https://ui-avatars.com/api/?name=Rohan" },
    ];

    const badges = [
        { name: "Good Job", icon: <Star size={24} />, color: "bg-yellow-100 text-yellow-600" },
        { name: "Helping Others", icon: <ThumbsUp size={24} />, color: "bg-blue-100 text-blue-600" },
        { name: "Talkative", icon: <MessageSquare size={24} />, color: "bg-orange-100 text-orange-600" },
        { name: "No Homework", icon: <Frown size={24} />, color: "bg-red-100 text-red-600" },
    ];

    const handleGiveBadge = (badgeName) => {
        alert(`Given "${badgeName}" to ${selectedStudent.name}`);
        setSelectedStudent(null);
    };

    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gray-50 min-h-screen">

            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Class Behavior 🌟</h2>

            {/* Student Grid */}
            <div className="grid grid-cols-3 gap-4">
                {students.map((std) => (
                    <div
                        key={std.id}
                        onClick={() => setSelectedStudent(std)}
                        className={`bg-white p-3 rounded-2xl shadow-sm border text-center cursor-pointer transition active:scale-95 ${selectedStudent?.id === std.id ? 'border-teal-500 ring-2 ring-teal-100' : 'border-gray-100'}`}
                    >
                        <img src={std.img} className="w-12 h-12 rounded-full mx-auto mb-2" />
                        <p className="text-xs font-bold text-gray-700">{std.name}</p>
                        <p className="text-[10px] text-gray-400">Roll: {std.roll}</p>
                    </div>
                ))}
            </div>

            {/* Badge Selection Modal (Bottom Sheet) */}
            {selectedStudent && (
                <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-2xl p-6 z-50 animate-in slide-in-from-bottom duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Give Remark to</p>
                            <h3 className="text-xl font-extrabold text-gray-800">{selectedStudent.name}</h3>
                        </div>
                        <button onClick={() => setSelectedStudent(null)} className="bg-gray-100 p-2 rounded-full text-gray-500">Close</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {badges.map((badge, i) => (
                            <button
                                key={i}
                                onClick={() => handleGiveBadge(badge.name)}
                                className={`flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-gray-200 active:scale-95 transition ${badge.color.replace('text', 'bg').replace('100', '50')}`}
                            >
                                <div className={`p-2 rounded-full ${badge.color}`}>{badge.icon}</div>
                                <span className="font-bold text-sm text-gray-700">{badge.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherRemarks;