import React from 'react';

const TeacherMarks = () => {
    const students = [
        { id: 1, name: 'Arav Sharma', roll: 21 },
        { id: 2, name: 'Priya Verma', roll: 22 },
        { id: 3, name: 'Rohan Das', roll: 23 },
    ];

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Marks</h2>

            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                <select className="p-2 bg-white border rounded-lg text-sm font-bold"><option>Mid Term</option></select>
                <select className="p-2 bg-white border rounded-lg text-sm font-bold"><option>Class 10-A</option></select>
                <select className="p-2 bg-white border rounded-lg text-sm font-bold"><option>Maths</option></select>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between font-bold text-gray-500 text-xs uppercase">
                    <span>Student Name</span>
                    <span>Marks (100)</span>
                </div>

                {students.map((s) => (
                    <div key={s.id} className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-gray-800">{s.name}</h4>
                            <p className="text-xs text-gray-400">Roll: {s.roll}</p>
                        </div>
                        <input
                            type="number"
                            placeholder="00"
                            className="w-16 p-2 text-center bg-gray-50 border border-gray-200 rounded-lg font-bold text-lg outline-green-500"
                        />
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-bold">
                Save Results
            </button>
        </div>
    );
};

export default TeacherMarks;