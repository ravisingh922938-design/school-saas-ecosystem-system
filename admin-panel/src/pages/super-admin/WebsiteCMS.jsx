import React from 'react';
import { Globe, Image, Save } from 'lucide-react';

const WebsiteCMS = () => {
    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Landing Page CMS</h2>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">

                {/* Hero Section Edit */}
                <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Globe size={18} className="text-blue-500" /> Hero Section
                    </h3>
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-600">Main Headline</label>
                        <input type="text" defaultValue="Manage Your School Smartly" className="w-full border p-3 rounded-lg" />

                        <label className="block text-sm font-bold text-slate-600">Sub-Text</label>
                        <textarea defaultValue="The complete ecosystem for Schools, Colleges..." className="w-full border p-3 rounded-lg h-24"></textarea>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="pt-4 border-t">
                    <h3 className="font-bold text-lg mb-3">SEO Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Meta Title" className="w-full border p-3 rounded-lg" />
                        <input type="text" placeholder="Meta Keywords" className="w-full border p-3 rounded-lg" />
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700">
                    <Save size={20} /> Publish Changes
                </button>

            </div>
        </div>
    );
};

export default WebsiteCMS;