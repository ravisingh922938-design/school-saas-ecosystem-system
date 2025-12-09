import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentPlayer = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <div className="w-full aspect-video bg-gray-900 sticky top-0 z-50">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Class Video" frameBorder="0" allowFullScreen></iframe>
                <Link to="/student/lms" className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white"><ArrowLeft size={20} /></Link>
            </div>
            <div className="flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 p-5">
                <h1 className="text-xl font-bold text-gray-800">Calculus: Basics</h1>
                <div className="mt-4 p-3 bg-gray-100 rounded-xl text-sm text-gray-500 flex items-center gap-2"><MessageCircle size={16} /> Live Chat Enabled</div>
            </div>
        </div>
    );
};
export default StudentPlayer;