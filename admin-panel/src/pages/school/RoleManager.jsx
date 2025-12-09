import React from 'react';
import { Shield, Lock, User } from 'lucide-react';

const RoleManager = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Staff Access Control</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Create Role */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Shield size={20} /> Create Role</h3>
                    <div className="space-y-4">
                        <input type="text" placeholder="Role Name (e.g. Librarian)" className="w-full border p-2 rounded-lg" />

                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500">Permissions</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <label className="flex items-center gap-2"><input type="checkbox" /> Manage Students</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> Collect Fees</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> Enter Marks</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> View Reports</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> Manage Inventory</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> Edit Settings</label>
                            </div>
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">Save Role</button>
                    </div>
                </div>

                {/* Existing Users & Roles */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User size={20} /> Staff Logins</h3>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50"><tr><th className="p-2">Name</th><th className="p-2">Role</th><th className="p-2">Action</th></tr></thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2">Mr. Amit (Accounts)</td>
                                <td className="p-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Accountant</span></td>
                                <td className="p-2 text-blue-600 cursor-pointer">Edit</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">Ms. Priya (Library)</td>
                                <td className="p-2"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Librarian</span></td>
                                <td className="p-2 text-blue-600 cursor-pointer">Edit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default RoleManager;