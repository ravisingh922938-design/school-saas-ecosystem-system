import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, Printer, Search, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FeeManager = () => {
    const [activeTab, setActiveTab] = useState('collect');
    const [searchTerm, setSearchTerm] = useState('');
    const [student, setStudent] = useState(null);
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState('Cash');
    const [loading, setLoading] = useState(false);
    const [recentFees, setRecentFees] = useState([]);
    const [defaulters, setDefaulters] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const schoolId = user?.schoolId || 'DPS';

    // 1. Fetch Recent Receipts
    useEffect(() => {
        if (activeTab === 'collect') fetchRecentFees();
        if (activeTab === 'defaulters') fetchDefaulters();
    }, [activeTab]);

    const fetchRecentFees = async () => {
        try {
            const res = await axios.get(`${API_URL}/school-data/fees/recent/${schoolId}`);
            if (res.data.success) setRecentFees(res.data.data);
        } catch (err) { console.error(err); }
    };

    const fetchDefaulters = async () => {
        try {
            const res = await axios.get(`${API_URL}/school-data/fees/defaulters/${schoolId}`);
            if (res.data.success) setDefaulters(res.data.data);
        } catch (err) { console.error(err); }
    };

    // 2. Search Student
    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/school-data/fees/search`, {
                params: { schoolId, search: searchTerm }
            });
            if (res.data.success) setStudent(res.data.data);
        } catch (err) {
            alert("Student Not Found");
            setStudent(null);
        } finally {
            setLoading(false);
        }
    };

    // 3. Collect Fee
    const handleCollect = async () => {
        if (!amount || !student) return;
        setLoading(true);
        try {
            await axios.post(`${API_URL}/school-data/fees/collect`, {
                schoolId,
                studentId: student._id,
                studentName: student.name,
                classId: `${student.classId}-${student.section}`,
                amount: parseInt(amount),
                mode
            });
            alert("✅ Payment Successful!");
            setStudent(null); // Clear
            setAmount('');
            setSearchTerm('');
            fetchRecentFees(); // Refresh list
        } catch (err) {
            alert("Transaction Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex gap-4 border-b border-gray-200 mb-6 bg-white p-4 rounded-xl shadow-sm">
                <button onClick={() => setActiveTab('collect')} className={`pb-2 px-4 font-bold transition ${activeTab === 'collect' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Fee Collection</button>
                <button onClick={() => setActiveTab('defaulters')} className={`pb-2 px-4 font-bold transition ${activeTab === 'defaulters' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}>Defaulters List</button>
            </div>

            {/* Tab 1: Collection */}
            {activeTab === 'collect' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold mb-4 text-gray-800">Collect Fees</h3>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                placeholder="Enter Student Name / Roll No"
                                className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={handleSearch} disabled={loading} className="bg-blue-600 text-white px-6 rounded-lg font-bold hover:bg-blue-700">
                                {loading ? '...' : <Search size={20} />}
                            </button>
                        </div>

                        {/* Student Details Context */}
                        {student && (
                            <div className="bg-blue-50 p-5 rounded-xl mb-6 border border-blue-100 animate-in fade-in">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-blue-900 text-lg">{student.name}</h4>
                                        <p className="text-sm text-blue-600">Class: {student.classId}-{student.section} | Roll: {student.rollNo}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Pending Dues</p>
                                        <p className="text-2xl font-black text-red-600">₹ {student.dueAmount}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500">Amount</label>
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="₹ 0" className="w-full border p-3 rounded-lg mt-1 font-bold text-lg" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500">Mode</label>
                                <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full border p-3 rounded-lg mt-1 bg-white">
                                    <option>Cash</option>
                                    <option>Online/UPI</option>
                                    <option>Cheque</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleCollect} disabled={!student || loading} className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex justify-center gap-2 transition disabled:opacity-50">
                            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />} Confirm Payment
                        </button>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                        <h3 className="font-bold mb-4 text-gray-800">Recent Receipts</h3>
                        <div className="space-y-4">
                            {recentFees.length === 0 ? <p className="text-gray-400 text-sm">No recent transactions.</p> : recentFees.map((fee) => (
                                <div key={fee._id} className="flex justify-between items-center text-sm border-b pb-3 last:border-0">
                                    <div>
                                        <p className="font-bold text-gray-800">{fee.studentName}</p>
                                        <p className="text-xs text-gray-500">{fee.receiptNo}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-green-600 block">₹ {fee.amount}</span>
                                        <Printer size={14} className="text-gray-400 cursor-pointer hover:text-blue-600 inline-block mt-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 2: Defaulters */}
            {activeTab === 'defaulters' && (
                <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
                    <div className="p-4 bg-red-50 flex justify-between items-center border-b border-red-100">
                        <h3 className="font-bold text-red-700 flex items-center gap-2"><AlertCircle size={20} /> Fee Defaulters</h3>
                        <button className="bg-red-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-red-700 font-bold">Send SMS to All</button>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-bold">
                            <tr><th className="p-4">Student</th><th className="p-4">Class</th><th className="p-4">Due Amount</th><th className="p-4">Phone</th><th className="p-4">Action</th></tr>
                        </thead>
                        <tbody>
                            {defaulters.map((std) => (
                                <tr key={std._id} className="border-b hover:bg-red-50/30">
                                    <td className="p-4 font-bold text-gray-800">{std.name}</td>
                                    <td className="p-4">{std.classId}-{std.section}</td>
                                    <td className="p-4 text-red-600 font-bold">₹ {std.dueAmount}</td>
                                    <td className="p-4">{std.phone}</td>
                                    <td className="p-4"><button className="text-blue-600 underline hover:text-blue-800 font-medium">Send Reminder</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FeeManager;