import React from 'react';
import { BookOpen, Clock } from 'lucide-react';

const StudentLibrary = () => {
    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">Library 📖</h2>

            {/* Issued Books */}
            <h3 className="font-bold text-gray-700 mb-3 px-1">Currently Issued</h3>
            <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-orange-500 flex gap-4 mb-6">
                <div className="w-16 h-20 bg-gray-200 rounded-lg flex-shrink-0 bg-[url('https://covers.openlibrary.org/b/id/8225261-M.jpg')] bg-cover"></div>
                <div>
                    <h4 className="font-bold text-gray-800">Harry Potter</h4>
                    <p className="text-xs text-gray-500">J.K. Rowling</p>
                    <div className="mt-3 flex items-center gap-1 text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded-md w-fit">
                        <Clock size={12} /> Return by: 20 Oct
                    </div>
                </div>
            </div>

            {/* History */}
            <h3 className="font-bold text-gray-700 mb-3 px-1">Reading History</h3>
            <div className="space-y-3">
                {['Science Encyclopedia', 'Short Stories Vol.1'].map((book, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center opacity-70">
                        <div className="flex items-center gap-3">
                            <div className="bg-teal-50 p-2 rounded-lg text-teal-600"><BookOpen size={18} /></div>
                            <span className="text-sm font-medium">{book}</span>
                        </div>
                        <span className="text-xs text-green-600 font-bold">Returned</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentLibrary;