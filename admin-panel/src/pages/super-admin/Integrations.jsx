import React from 'react';
import { ToggleRight, Settings } from 'lucide-react';

const Integrations = () => {
    const apps = [
        { name: 'Razorpay', desc: 'Payment Gateway', status: true, icon: '₹' },
        { name: 'Zoom Meetings', desc: 'Live Classes', status: false, icon: 'Z' },
        { name: 'Twilio SMS', desc: 'SMS Notifications', status: true, icon: 'T' },
        { name: 'Google Drive', desc: 'File Storage', status: false, icon: 'G' },
        { name: 'WhatsApp API', desc: 'Chat Alerts', status: true, icon: 'W' },
        { name: 'Sentry', desc: 'Error Tracking', status: false, icon: 'S' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Third-Party Integrations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-600">
                                {app.icon}
                            </div>
                            <button className={`text-2xl ${app.status ? 'text-green-500' : 'text-slate-300'}`}>
                                <ToggleRight />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">{app.name}</h3>
                        <p className="text-sm text-slate-500 mb-6">{app.desc}</p>

                        <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                            <Settings size={16} /> Configure
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Integrations;