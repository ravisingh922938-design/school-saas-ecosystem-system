import React from 'react';
import { Database, Download, Cloud } from 'lucide-react';

const DataBackup = () => {
    return (
        <div className="max-w-xl mx-auto text-center pt-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Database size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Data Backup</h2>
                <p className="text-gray-500 mb-8">Download a complete copy of your school's data (Students, Fees, Marks) in Excel/SQL format.</p>

                <div className="space-y-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-200">
                        <Download size={24} /> Download Excel Backup
                    </button>
                    <button className="w-full border border-gray-300 text-gray-600 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50">
                        <Cloud size={24} /> Sync to Google Drive
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-6">Last Backup: 2 days ago • Size: 45 MB</p>
            </div>
        </div>
    );
};

export default DataBackup;