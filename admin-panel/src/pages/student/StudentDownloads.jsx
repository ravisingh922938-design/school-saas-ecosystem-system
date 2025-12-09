import React from 'react';
import { FileText, Download } from 'lucide-react';

const StudentDownloads = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Downloads</h2>
            {[1, 2].map((i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg"><FileText size={20} /></div>
                        <div><h4 className="font-bold text-gray-700">Math Notes</h4><p className="text-xs text-gray-400">PDF • 2.4 MB</p></div>
                    </div>
                    <Download size={20} className="text-gray-400" />
                </div>
            ))}
        </div>
    );
};
export default StudentDownloads;