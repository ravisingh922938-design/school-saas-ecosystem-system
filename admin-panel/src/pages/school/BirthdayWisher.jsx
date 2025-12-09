import React from 'react';
import { Gift, Send } from 'lucide-react';

const BirthdayWisher = () => {
    const birthdays = [
        { name: 'Amit Kumar', role: 'Student (5-A)', date: 'Today' },
        { name: 'Mrs. Sharma', role: 'Teacher', date: 'Today' },
        { name: 'Rohan Das', role: 'Student (9-B)', date: 'Tomorrow' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Celebrations 🎉</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {birthdays.map((person, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm text-center">
                        <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gift size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">{person.name}</h3>
                        <p className="text-sm text-gray-500 mb-1">{person.role}</p>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{person.date}</span>

                        <div className="mt-6 flex gap-2">
                            <button className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">SMS</button>
                            <button className="flex-1 bg-pink-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-pink-600 flex items-center justify-center gap-1">
                                <Send size={14} /> Wish
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BirthdayWisher;