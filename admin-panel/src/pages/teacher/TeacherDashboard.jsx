import React from 'react';
import { CheckSquare, BookOpen, Clock, Calendar, Bell } from 'lucide-react';

const TeacherDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 pb-20 font-sans flex justify-center">
            <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">
                <div className="bg-green-600 p-6 pt-8 rounded-b-[2.5rem] text-white shadow-lg relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-green-100 text-xs font-medium uppercase">Welcome back,</p>
                            <h1 className="text-xl font-bold">Rahul Sir</h1>
                        </div>
                        <Bell size={20} className="text-white" />
                    </div>
                    <div className="bg-white text-gray-800 p-4 rounded-2xl shadow-xl flex justify-between items-center transform translate-y-4">
                        <div>
                            <p className="text-gray-400 text-[10px] font-bold uppercase">NEXT CLASS</p>
                            <h3 className="font-bold text-lg text-gray-800">Class 10-A</h3>
                        </div>
                        <button className="bg-green-600 text-white p-3 rounded-xl shadow-lg"><CheckSquare size={24} /></button>
                    </div>
                </div>
                <div className="mt-10 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg"><Calendar size={20} className="text-green-600" /> Today's Schedule</h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-l-4 border-l-blue-500"><h4 className="font-bold">Maths - 10A</h4></div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-l-4 border-l-purple-500"><h4 className="font-bold">Science - 9B</h4></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TeacherDashboard;