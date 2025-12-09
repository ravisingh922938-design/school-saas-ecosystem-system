import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

const TeacherAttendance = () => {
    // Dummy Students
    const [students, setStudents] = useState([
        { id: 1, name: 'Arav Sharma', roll: 21, present: true },
        { id: 2, name: 'Priya Verma', roll: 22, present: true },
        { id: 3, name: 'Rohan Das', roll: 23, present: true },
        { id: 4, name: 'Simran Kaur', roll: 24, present: false }, // Absent
        { id: 5, name: 'Vikram Singh', roll: 25, present: true },
    ]);

    const toggleAttendance = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mark Attendance</h2>

            {/* Date & Class Selector */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex justify-between items-center border border-gray-100">
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Class</p>
                    <h3 className="text-lg font-bold text-gray-800">10 - A</h3>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                    <Calendar size={16} /> Today
                </div>
            </div>

            {/* Student List */}
            <div className="space-y-3">
                {students.map((student) => (
                    <div key={student.id}
                        onClick={() => toggleAttendance(student.id)}
                        className={`p-4 rounded-xl flex justify-between items-center cursor-pointer transition border ${student.present ? 'bg-white border-gray-100' : 'bg-red-50 border-red-100'}`}>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                {student.roll}
                            </div>
                            <div>
                                <h4 className={`font-bold ${student.present ? 'text-gray-800' : 'text-red-700'}`}>{student.name}</h4>
                                <p className="text-xs text-gray-400">Roll No. {student.roll}</p>
                            </div>
                        </div>

                        <div className="text-2xl">
                            {student.present
                                ? <CheckCircle className="text-green-500" size={28} fill="#dcfce7" />
                                : <XCircle className="text-red-500" size={28} fill="#fee2e2" />
                            }
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-200">
                Submit Attendance
            </button>
        </div>
    );
};

export default TeacherAttendance;