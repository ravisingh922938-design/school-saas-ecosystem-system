import React from 'react';
import { Database, Download, RefreshCw, Server } from 'lucide-react';

const Backups = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">System Backups</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-3 rounded-full"><Database size={24} /></div>
                        <div>
                            <h3 className="text-lg font-bold">Auto-Backup Enabled</h3>
                            <p className="text-blue-100 text-sm">Next backup in 2 hours</p>
                        </div>
                    </div>
                    <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-50 transition">
                        Trigger Manual Backup
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full text-green-600 mb-2"><Server size={24} /></div>
                    <h3 className="font-bold text-slate-800">Database Size</h3>
                    <p className="text-2xl font-extrabold text-slate-900">450 MB</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b font-bold text-slate-700">Backup History</div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b flex justify-between items-center hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded"><Database size={18} className="text-slate-500" /></div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">backup_oct_{20 + i}_2025.sql</p>
                                <p className="text-xs text-slate-500">Size: 120MB • Automatic</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                <Download size={16} /> Download
                            </button>
                            <button className="text-orange-600 hover:bg-orange-50 p-2 rounded-lg text-sm font-medium flex items-center gap-1">
                                <RefreshCw size={16} /> Restore
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Backups;