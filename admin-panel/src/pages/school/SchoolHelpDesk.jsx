import React from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';

const SchoolHelpDesk = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 lg:col-span-1">
                <h3 className="font-bold mb-4">Inbox</h3>
                <div className="space-y-2">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded cursor-pointer">
                        <h4 className="font-bold text-sm">Bus Late Again</h4>
                        <p className="text-xs text-gray-500">Parent: Rajesh (10-A)</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 border rounded cursor-pointer">
                        <h4 className="font-bold text-sm">Wrong Marks in Report</h4>
                        <p className="text-xs text-gray-500">Parent: Amit (9-B)</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 lg:col-span-2 flex flex-col justify-between min-h-[400px]">
                <div>
                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <div>
                            <h2 className="text-xl font-bold">Bus Late Again</h2>
                            <p className="text-sm text-gray-500">Ticket #2045 • High Priority</p>
                        </div>
                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Open</button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
                        <p className="font-bold text-gray-700 mb-1">Parent Wrote:</p>
                        <p>The bus on Route 5 arrived 20 minutes late today. This is the second time this week.</p>
                    </div>
                </div>

                <div>
                    <textarea className="w-full border p-3 rounded-lg h-24 mb-3" placeholder="Type your reply to parent..."></textarea>
                    <div className="flex justify-end gap-3">
                        <button className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                            <CheckCircle size={18} /> Mark Resolved
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Send Reply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolHelpDesk;