import React from 'react';
import { Bell, Calendar, Pin } from 'lucide-react';

const TeacherNotices = () => {
    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Notice Board 📢</h2>

            <div className="space-y-4">
                {/* Urgent Notice */}
                <div className="bg-red-50 border border-red-100 p-5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-100 text-red-600 px-3 py-1 rounded-bl-xl text-[10px] font-bold">URGENT</div>
                    <h3 className="font-bold text-red-900 text-lg mb-1">Staff Meeting</h3>
                    <p className="text-sm text-red-700 leading-relaxed">All teachers are requested to gather in the Staff Room at 2:00 PM for the Annual Function discussion.</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-red-400 font-medium">
                        <ClockIcon /> Today, 10:00 AM
                    </div>
                </div>

                {/* General Notices */}
                {[
                    { title: "Holiday Declared", desc: "School will remain closed tomorrow due to heavy rain.", date: "Yesterday" },
                    { title: "Marks Submission", desc: "Last date to submit Mid-Term marks is 20th Oct.", date: "12 Oct" }
                ].map((notice, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800">{notice.title}</h3>
                            <Pin size={16} className="text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{notice.desc}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 w-fit px-2 py-1 rounded-md">
                            <Calendar size={12} /> {notice.date}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;

export default TeacherNotices;