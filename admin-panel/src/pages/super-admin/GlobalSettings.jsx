import React from 'react';

const GlobalSettings = () => {
    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Global Configurations</h2>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">

                {/* SMS Gateway */}
                <div>
                    <h3 className="font-bold text-lg mb-2">SMS Gateway (Twilio/Msg91)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="API Key" className="border p-3 rounded-lg w-full" />
                        <input type="text" placeholder="Sender ID" className="border p-3 rounded-lg w-full" />
                    </div>
                </div>

                {/* Email Gateway */}
                <div>
                    <h3 className="font-bold text-lg mb-2">Email Gateway (SMTP)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="SMTP Host" className="border p-3 rounded-lg w-full" />
                        <input type="number" placeholder="Port" className="border p-3 rounded-lg w-full" />
                        <input type="text" placeholder="Username" className="border p-3 rounded-lg w-full" />
                        <input type="password" placeholder="Password" className="border p-3 rounded-lg w-full" />
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700">
                        Save System Settings
                    </button>
                </div>

            </div>
        </div>
    );
};

export default GlobalSettings;