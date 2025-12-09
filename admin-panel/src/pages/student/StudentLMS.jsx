import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentLMS = () => {
    return (
        <div className="p-4 pb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Classroom</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-4">
                <div className="relative h-40 bg-gray-900 flex items-center justify-center">
                    <Play className="text-white opacity-80" size={40} />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">LIVE</div>
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg">Maths: Calculus</h3>
                    <p className="text-gray-500 text-sm mb-4">Rahul Sir • Started 10 mins ago</p>
                    <Link to="/student/video/1"><button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Join Class</button></Link>
                </div>
            </div>
        </div>
    );
};
export default StudentLMS;