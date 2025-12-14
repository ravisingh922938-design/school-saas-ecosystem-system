import React from 'react';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const StudentNotifications = () => {
    const notifications = [
        { title: "Fee Due Reminder", desc: "Your tuition fee for October is pending.", time: "2 hours ago", type: "alert" },
        { title: "Homework Assigned", desc: "Maths Ex 4.2 added by R.K. Sir.", time: "5 hours ago", type: "info" },
        { title: "Leave Approved", desc: "Your leave for 2 days has been approved.", time: "Yesterday", type: "success" },
        { title: "School Closed", desc: "School will remain closed tomorrow due to rain.", time: "2 days ago", type: "alert" },
    ];

    return (
        <div className="pb-24 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Notifications 🔔</h2>

            <div className="space-y-3">
                {notifications.map((notif, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border flex gap-4 ${notif.type === 'alert' ? 'bg-red-50 border-red-100' :
                        notif.type === 'success' ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100 shadow-sm'
                        }`}>
                        <div className={`p-2 rounded-full h-fit ${notif.type === 'alert' ? 'bg-red-100 text-red-600' :
                            notif.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                            {notif.type === 'alert' ? <AlertTriangle size={20} /> : notif.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">{notif.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.desc}</p>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentNotifications;