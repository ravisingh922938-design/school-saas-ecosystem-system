import React from 'react';
import { Send, Bell, Mail, Smartphone } from 'lucide-react';

const Broadcast = () => {
    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Broadcast Center</h2>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">

                {/* Channel Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-600 mb-3">Select Channel</label>
                    <div className="flex gap-4">
                        <button className="flex-1 py-3 border-2 border-indigo-600 bg-indigo-50 text-indigo-700 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Mail size={20} /> Email Blast
                        </button>
                        <button className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-medium flex items-center justify-center gap-2 text-slate-600">
                            <Bell size={20} /> Push Notification
                        </button>
                        <button className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-medium flex items-center justify-center gap-2 text-slate-600">
                            <Smartphone size={20} /> SMS
                        </button>
                    </div>
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-600 mb-2">Target Audience</label>
                    <select className="w-full border p-3 rounded-lg text-slate-700">
                        <option>All Active Schools</option>
                        <option>Premium Plan Users Only</option>
                        <option>Pending/Suspended Schools</option>
                    </select>
                </div>

                {/* Message Body */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-600 mb-2">Subject / Title</label>
                    <input type="text" placeholder="e.g., System Update Alert" className="w-full border p-3 rounded-lg mb-4" />

                    <label className="block text-sm font-bold text-slate-600 mb-2">Message</label>
                    <textarea className="w-full border p-3 rounded-lg h-32" placeholder="Type your announcement here..."></textarea>
                </div>

                {/* Send Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition">
                    <Send size={20} /> Send Broadcast
                </button>

            </div>

            {/* History */}
            <div className="mt-8">
                <h3 className="font-bold text-slate-700 mb-4">Recent Broadcasts</h3>
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                        <div>
                            <h4 className="font-bold text-slate-800">Dussehra Holiday Notice</h4>
                            <p className="text-xs text-slate-500">Sent via Email • All Schools</p>
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Delivered</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-slate-800">Server Maintenance</h4>
                            <p className="text-xs text-slate-500">Sent via Push • Active Users</p>
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Delivered</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Broadcast;