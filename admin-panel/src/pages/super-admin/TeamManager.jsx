import React from 'react';
import { UserPlus, ShieldCheck, Trash2 } from 'lucide-react';

const TeamManager = () => {
    const team = [
        { id: 1, name: 'Vikram Singh', role: 'Support Agent', email: 'vikram@saas.com', access: 'Read Only' },
        { id: 2, name: 'Anjali Mehra', role: 'Sales Manager', email: 'anjali@saas.com', access: 'Billing Access' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Internal Team (Sub-Admins)</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
                    <UserPlus size={18} /> Add Employee
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b text-slate-500 text-sm">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Access Level</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((member) => (
                            <tr key={member.id} className="border-b last:border-0 hover:bg-slate-50">
                                <td className="p-4">
                                    <p className="font-bold text-slate-800">{member.name}</p>
                                    <p className="text-xs text-slate-500">{member.email}</p>
                                </td>
                                <td className="p-4">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">{member.role}</span>
                                </td>
                                <td className="p-4 flex items-center gap-2 text-slate-600">
                                    <ShieldCheck size={16} /> {member.access}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamManager;