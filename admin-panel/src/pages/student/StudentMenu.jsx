import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, BookOpen, FileText, Bell, User, Settings, PlayCircle, PenTool, Download } from 'lucide-react';

const StudentMenu = () => {
    const items = [
        { name: 'Live Class', icon: <PlayCircle />, path: '/student/lms', color: 'bg-red-100 text-red-600' },
        { name: 'Online Test', icon: <PenTool />, path: '/student/test', color: 'bg-indigo-100 text-indigo-600' },
        { name: 'Downloads', icon: <Download />, path: '/student/downloads', color: 'bg-blue-100 text-blue-600' },
        { name: 'Attendance', icon: <User />, path: '/student/attendance', color: 'bg-green-100 text-green-600' },
        { name: 'Transport', icon: <Bus />, path: '/student/transport', color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Notices', icon: <Bell />, path: '/student/notices', color: 'bg-purple-100 text-purple-600' },
        { name: 'Results', icon: <FileText />, path: '/student/results', color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Menu</h2>
            <div className="grid grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <Link key={idx} to={item.path} className="flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${item.color}`}>
                            {React.cloneElement(item.icon, { size: 28 })}
                        </div>
                        <span className="text-[11px] font-bold text-gray-600 text-center">{item.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default StudentMenu;