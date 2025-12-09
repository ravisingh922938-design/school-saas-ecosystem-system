import React from 'react';

const StudentNotices = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Notice Board</h2>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-100 text-red-600">URGENT</span>
                    <span className="text-xs text-gray-400">29 Nov</span>
                </div>
                <h3 className="font-bold text-gray-800">School Holiday</h3>
                <p className="text-sm text-gray-500 mt-1">School will remain closed tomorrow due to heavy rain.</p>
            </div>
        </div>
    );
};
export default StudentNotices;