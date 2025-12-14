import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

const TeacherAttendance = () => {
    // Dummy Students
    const [students, setStudents] = useState([
        { id: 1, name: "Arav Sharma", roll: 1, status: "P" },
        { id: 2, name: "Aditi Verma", roll: 2, status: "P" },
        { id: 3, name: "Rohan Singh", roll: 3, status: "A" },
        { id: 4, name: "Sneha Gupta", roll: 4, status: "P" },
        { id: 5, name: "Vikram Malhotra", roll: 5, status: "P" },
    ]);

    const toggleStatus = (id) => {
        setStudents(students.map(std =>
            std.id === id ? { ...std, status: std.status === "P" ? "A" : "P" } : std
        ));
    };

    return (
        <div className="p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Attendance 📝</h2>
                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Calendar size={14} /> Today, 12 Oct
                </div>
            </div>

            {/* Class Selector */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Class</p>
                    <h3 className="text-lg font-bold text-gray-800">10 - A</h3>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                    <h3 className="text-lg font-bold text-gray-800">{students.length}</h3>
                </div>
            </div>

            {/* Student List */}
            <div className="space-y-3 mb-20">
                {students.map((std) => (
                    <div key={std.id}
                        onClick={() => toggleStatus(std.id)}
                        className={`flex justify-between items-center p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 ${std.status === "P"
                            ? 'bg-white border-teal-100 shadow-sm'
                            : 'bg-red-50 border-red-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                {std.roll}
                            </div>
                            <div>
                                <h4 className={`font-bold ${std.status === "P" ? 'text-gray-800' : 'text-red-800'}`}>{std.name}</h4>
                                <p className="text-xs text-gray-400">Roll No. {std.roll}</p>
                            </div>
                        </div>

                        <div>
                            {std.status === "P" ? (
                                <CheckCircle size={28} className="text-teal-500 fill-teal-50" />
                            ) : (
                                <XCircle size={28} className="text-red-500 fill-red-50" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className="fixed bottom-20 left-0 w-full px-6">
                <button className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-teal-200 active:scale-95 transition">
                    Submit Attendance ({students.filter(s => s.status === 'P').length}/{students.length})
                </button>
            </div>

        </div>
    );
};

export default TeacherAttendance;