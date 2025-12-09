import React, { useState } from 'react';
import { Plus, Search, Key, MoreVertical, Ban, CheckCircle } from 'lucide-react';

const SchoolManager = () => {
    const [showModal, setShowModal] = useState(false);

    // Fake Data for Demo
    const [schools, setSchools] = useState([
        { id: 1, name: 'Delhi Public School', principal: 'Dr. R. Sharma', phone: '9876543210', plan: 'Platinum', status: 'Active' },
        { id: 2, name: 'Sunshine Academy', principal: 'Mrs. S. Verma', phone: '9123456780', plan: 'Gold', status: 'Suspended' },
    ]);

    // Handle "Add School"
    const handleAddSchool = (e) => {
        e.preventDefault();
        alert("New School Created! Email sent to Principal with Credentials.");
        setShowModal(false);
    };

    // Handle "Impersonate" (Login as School)
    const impersonateLogin = (schoolName) => {
        const confirm = window.confirm(`⚠️ SECURITY ALERT\n\nYou are about to login as the Admin of "${schoolName}".\nDo you want to proceed?`);
        if (confirm) {
            // Real app mein yahan token generate hota hai
            window.location.href = '/school'; // Redirecting to School Dashboard
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Manage Schools</h2>
                    <p className="text-slate-500">Onboard new tenants and manage access.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-200 transition"
                >
                    <Plus size={20} /> Onboard New School
                </button>
            </div>

            {/* School List Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 font-semibold text-sm uppercase">
                        <tr>
                            <th className="p-5">School Name & Domain</th>
                            <th className="p-5">Principal (KYC)</th>
                            <th className="p-5">Subscription</th>
                            <th className="p-5">Status</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.map((school) => (
                            <tr key={school.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                <td className="p-5">
                                    <p className="font-bold text-slate-800">{school.name}</p>
                                    <p className="text-xs text-slate-500">{school.name.toLowerCase().replace(/ /g, '')}.saas.com</p>
                                </td>
                                <td className="p-5">
                                    <p className="text-sm font-medium">{school.principal}</p>
                                    <p className="text-xs text-slate-500">Ph: {school.phone}</p>
                                </td>
                                <td className="p-5">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${school.plan === 'Platinum' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {school.plan}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <span className={`flex items-center gap-1 text-xs font-bold ${school.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                        {school.status === 'Active' ? <CheckCircle size={14} /> : <Ban size={14} />} {school.status}
                                    </span>
                                </td>
                                <td className="p-5 text-right flex justify-end gap-2">
                                    {/* Impersonation Button */}
                                    <button
                                        onClick={() => impersonateLogin(school.name)}
                                        title="Login as Admin (Impersonate)"
                                        className="p-2 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg transition"
                                    >
                                        <Key size={18} />
                                    </button>
                                    <button className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-lg transition">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add School Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 animate-in fade-in zoom-in">
                        <h3 className="text-xl font-bold mb-4">Onboard New School (KYC)</h3>
                        <form onSubmit={handleAddSchool} className="space-y-4">

                            {/* School Details */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">School Details</label>
                                <div className="grid grid-cols-2 gap-4 mt-1">
                                    <input type="text" placeholder="School Name" className="border p-2 rounded-lg w-full" required />
                                    <input type="text" placeholder="Custom Domain (Slug)" className="border p-2 rounded-lg w-full" />
                                </div>
                            </div>

                            {/* Principal KYC */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Principal / Owner KYC</label>
                                <div className="grid grid-cols-2 gap-4 mt-1">
                                    <input type="text" placeholder="Principal Name" className="border p-2 rounded-lg w-full" required />
                                    <input type="text" placeholder="Phone Number" className="border p-2 rounded-lg w-full" required />
                                    <input type="email" placeholder="Official Email" className="border p-2 rounded-lg w-full col-span-2" required />
                                </div>
                            </div>

                            {/* Plan Selection */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Subscription</label>
                                <select className="border p-2 rounded-lg w-full mt-1">
                                    <option>Basic Plan (₹ 5,000/yr)</option>
                                    <option>Gold Plan (₹ 15,000/yr)</option>
                                    <option>Platinum Plan (₹ 25,000/yr)</option>
                                </select>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">Create & Send Credentials</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolManager;