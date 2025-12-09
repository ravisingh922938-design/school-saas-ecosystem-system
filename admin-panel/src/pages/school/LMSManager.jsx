import React from 'react';
import { Video, BookOpen, UploadCloud } from 'lucide-react';

const LMSManager = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Upload Study Material */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><UploadCloud size={20} /> Upload Content</h3>
                <div className="space-y-4">
                    <select className="w-full border p-2 rounded-lg"><option>Select Class (10-A)</option></select>
                    <select className="w-full border p-2 rounded-lg"><option>Select Subject (Physics)</option></select>
                    <input type="text" placeholder="Topic / Title" className="w-full border p-2 rounded-lg" />
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg cursor-pointer hover:bg-gray-50">
                        <p className="text-gray-500 text-sm">Drag & Drop PDF / Video here</p>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Publish to Student App</button>
                </div>
            </div>

            {/* Live Classes */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Video size={20} /> Schedule Live Class</h3>
                <div className="space-y-3">
                    <div className="p-3 border rounded-lg flex justify-between items-center bg-blue-50">
                        <div>
                            <h4 className="font-bold text-blue-900">Math: Algebra Doubt Session</h4>
                            <p className="text-xs text-blue-600">Today, 4:00 PM • Zoom</p>
                        </div>
                        <button className="text-xs bg-white border border-blue-200 px-3 py-1 rounded text-blue-600">Edit</button>
                    </div>
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-gray-800">English: Grammar</h4>
                            <p className="text-xs text-gray-500">Tomorrow, 10:00 AM • Google Meet</p>
                        </div>
                        <button className="text-xs border px-3 py-1 rounded">Edit</button>
                    </div>
                </div>
                <button className="mt-4 w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-bold">+ Create New Link</button>
            </div>
        </div>
    );
};

export default LMSManager;