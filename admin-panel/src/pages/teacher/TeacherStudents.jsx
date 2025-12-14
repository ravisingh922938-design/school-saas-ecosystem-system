import React from 'react';
import { Phone, MessageCircle, Search } from 'lucide-react';

const TeacherStudents = () => {
    const students = [
        { name: "Arav Sharma", roll: 1, father: "Rajesh Sharma", phone: "9876543210" },
        { name: "Aditi Verma", roll: 2, father: "Vikram Verma", phone: "9876543211" },
        { name: "Rohan Singh", roll: 3, father: "Amit Singh", phone: "9876543212" },
        { name: "Sneha Gupta", roll: 4, father: "Sunil Gupta", phone: "9876543213" },
    ];

    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">My Students 👥</h2>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="text" placeholder="Search student..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
            </div>

            {/* List */}
            <div className="space-y-3">
                {students.map((std, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-lg border border-gray-200">
                                {std.roll}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{std.name}</h4>
                                <p className="text-[10px] text-gray-500">F: {std.father}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <a href={`tel:${std.phone}`} className="p-2.5 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">
                                <Phone size={18} />
                            </a>
                            <a href={`https://wa.me/91${std.phone}`} className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TeacherStudents;