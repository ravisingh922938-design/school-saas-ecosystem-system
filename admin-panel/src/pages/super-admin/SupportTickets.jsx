import React, { useState } from 'react';
import { MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const SupportTickets = () => {
    const [tickets, setTickets] = useState([
        { id: 101, school: 'Delhi Public School', subject: 'Payment Failed', status: 'Open', priority: 'High', date: '2 hrs ago' },
        { id: 102, school: 'Sunshine Academy', subject: 'Domain not working', status: 'Pending', priority: 'Medium', date: '5 hrs ago' },
        { id: 103, school: 'City Montessori', subject: 'How to add student?', status: 'Resolved', priority: 'Low', date: '1 day ago' },
    ]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Support Help Desk</h2>

            {/* Ticket Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600"><AlertCircle /></div>
                    <div><h3 className="font-bold text-xl">5</h3><p className="text-xs text-slate-500">Open Tickets</p></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Clock /></div>
                    <div><h3 className="font-bold text-xl">12</h3><p className="text-xs text-slate-500">Pending</p></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle /></div>
                    <div><h3 className="font-bold text-xl">84</h3><p className="text-xs text-slate-500">Resolved</p></div>
                </div>
            </div>

            {/* Ticket List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border-b last:border-0 hover:bg-slate-50 flex justify-between items-center transition">
                        <div className="flex gap-4">
                            <div className="bg-slate-100 p-3 rounded-full h-12 w-12 flex items-center justify-center font-bold text-slate-600">
                                #{ticket.id}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{ticket.subject}</h4>
                                <p className="text-sm text-slate-500">{ticket.school} • <span className="text-xs">{ticket.date}</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                {ticket.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                ${ticket.status === 'Open' ? 'bg-orange-100 text-orange-700' :
                                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                {ticket.status}
                            </span>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                                Reply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportTickets;