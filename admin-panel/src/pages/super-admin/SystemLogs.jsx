import React from 'react';
import { ShieldAlert, FileText, User } from 'lucide-react';

const SystemLogs = () => {
    const logs = [
        { id: 1, action: 'School Created', detail: 'Created "Sunshine Academy"', user: 'Super Admin', ip: '192.168.1.1', time: '10:30 AM' },
        { id: 2, action: 'Plan Updated', detail: 'Changed "DPS" to Gold Plan', user: 'Manager John', ip: '192.168.1.45', time: '09:15 AM' },
        { id: 3, action: 'Failed Login', detail: '3 Failed attempts', user: 'Unknown', ip: '110.22.44.1', time: 'Yesterday' },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Audit Logs & Activity</h2>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b text-slate-500">
                        <tr>
                            <th className="p-4">Action</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">User</th>
                            <th className="p-4">IP Address</th>
                            <th className="p-4">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-indigo-700 flex items-center gap-2">
                                    <FileText size={16} /> {log.action}
                                </td>
                                <td className="p-4 text-slate-600">{log.detail}</td>
                                <td className="p-4 flex items-center gap-2">
                                    <User size={16} className="text-slate-400" /> {log.user}
                                </td>
                                <td className="p-4 font-mono text-xs bg-slate-50 w-fit rounded">{log.ip}</td>
                                <td className="p-4 text-slate-500">{log.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemLogs;