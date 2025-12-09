import React, { useState } from 'react';
import { Phone, Users, Clipboard, Plus } from 'lucide-react';

const FrontOffice = () => {
    const [activeTab, setActiveTab] = useState('enquiry');

    return (
        <div>
            <div className="flex gap-4 border-b mb-6">
                <button onClick={() => setActiveTab('enquiry')} className={`pb-2 px-4 font-bold ${activeTab === 'enquiry' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Admission Enquiries</button>
                <button onClick={() => setActiveTab('visitor')} className={`pb-2 px-4 font-bold ${activeTab === 'visitor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Visitor Book</button>
                <button onClick={() => setActiveTab('complaint')} className={`pb-2 px-4 font-bold ${activeTab === 'complaint' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Complaints</button>
            </div>

            {/* Enquiries (Kanban Style) */}
            {activeTab === 'enquiry' && (
                <div className="grid grid-cols-3 gap-4">
                    {['New Enquiry', 'Follow Up', 'Ready for Admission'].map((status) => (
                        <div key={status} className="bg-gray-100 p-4 rounded-xl min-h-[300px]">
                            <h3 className="font-bold text-gray-700 mb-3 flex justify-between">{status} <Plus size={16} className="cursor-pointer" /></h3>
                            <div className="space-y-3">
                                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md">
                                    <h4 className="font-bold">Rohan Gupta</h4>
                                    <p className="text-xs text-gray-500">Class 5 • Father: Amit Gupta</p>
                                    <div className="flex items-center gap-1 text-xs text-blue-600 mt-2"><Phone size={12} /> 9876543210</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Visitor Book */}
            {activeTab === 'visitor' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50"><tr><th className="p-4">Visitor Name</th><th className="p-4">Purpose</th><th className="p-4">Time In</th><th className="p-4">Time Out</th></tr></thead>
                        <tbody>
                            <tr className="border-b"><td className="p-4">Mr. Verma</td><td className="p-4">Book Supply</td><td className="p-4">10:00 AM</td><td className="p-4 text-gray-400">--</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FrontOffice;