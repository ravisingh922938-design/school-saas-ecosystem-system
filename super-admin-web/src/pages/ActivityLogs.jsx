import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      user: 'Super Admin',
      userAvatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=random',
      action: 'Created Tenant',
      target: 'Delta Academy',
      ipAddress: '192.168.1.1',
      timestamp: '2023-10-26 10:30:00',
    },
    {
      id: 2,
      user: 'Super Admin',
      userAvatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=random',
      action: 'Updated Settings',
      target: 'Billing Config',
      ipAddress: '192.168.1.2',
      timestamp: '2023-10-26 11:00:00',
    },
    {
      id: 3,
      user: 'Super Admin',
      userAvatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=random',
      action: 'Deleted School',
      target: 'Old ABC School',
      ipAddress: '192.168.1.3',
      timestamp: '2023-10-26 12:15:00',
    },
    {
      id: 4,
      user: 'Super Admin',
      userAvatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=random',
      action: 'Logged in as Admin',
      target: 'Alpha High School',
      ipAddress: '192.168.1.4',
      timestamp: '2023-10-26 14:00:00',
    },
  ]);

  const handleExportToCSV = () => {
    alert('Exporting activity logs to CSV...');
    // Implement actual CSV export logic here
  };

  const getActionHighlightClass = (action) => {
    if (action.includes('Deleted')) {
      return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
    } else if (action.includes('Created')) {
      return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
    } else {
      return 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-100';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">System Audit Logs</h1>
        <button
          onClick={handleExportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          <FileText size={20} /> Export to CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg dark:bg-slate-800 dark:border-slate-700">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-100 dark:border-slate-700 dark:text-gray-300">
              <th className="py-3 px-4 font-medium text-left">User</th>
              <th className="py-3 px-4 font-medium text-left">Action</th>
              <th className="py-3 px-4 font-medium text-left">Target</th>
              <th className="py-3 px-4 font-medium text-left">IP Address</th>
              <th className="py-3 px-4 font-medium text-left">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition dark:border-slate-700 dark:hover:bg-slate-700">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img
                    src={log.userAvatar}
                    alt={log.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-100">{log.user}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getActionHighlightClass(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-100">{log.target}</td>
                <td className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">{log.ipAddress}</td>
                <td className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;
