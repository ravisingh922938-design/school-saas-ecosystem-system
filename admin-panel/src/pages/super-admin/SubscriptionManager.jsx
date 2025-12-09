import React from 'react';
import { Check } from 'lucide-react';

const SubscriptionManager = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Subscription Plans</h2>

            {/* Plans Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    { name: 'Basic', price: '₹5,000', color: 'border-slate-200' },
                    { name: 'Gold', price: '₹15,000', color: 'border-yellow-400 ring-2 ring-yellow-400' },
                    { name: 'Platinum', price: '₹25,000', color: 'border-slate-200' },
                ].map((plan, idx) => (
                    <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border ${plan.color} relative`}>
                        {plan.name === 'Gold' && <span className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-xl text-white">POPULAR</span>}
                        <h3 className="text-lg font-bold text-slate-500">{plan.name}</h3>
                        <div className="text-4xl font-extrabold text-slate-800 my-2">{plan.price}<span className="text-sm font-normal text-slate-400">/year</span></div>
                        <ul className="space-y-2 mt-4 text-sm text-slate-600">
                            <li className="flex gap-2"><Check size={16} className="text-green-500" /> Student Limit: 500</li>
                            <li className="flex gap-2"><Check size={16} className="text-green-500" /> Teacher App</li>
                            <li className="flex gap-2"><Check size={16} className="text-green-500" /> Exam Module</li>
                        </ul>
                        <button className="w-full mt-6 py-2 border border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50">Edit Plan</button>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Payment History</h2>
            <div className="bg-white rounded-xl shadow-sm border p-4">
                {/* Simple List for Payments */}
                <div className="flex justify-between border-b py-3 font-bold text-slate-500 text-sm">
                    <span>School Name</span>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Status</span>
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between py-4 border-b last:border-0 text-sm">
                        <span className="font-semibold">Delhi Public School</span>
                        <span className="text-slate-500">20 Oct 2025</span>
                        <span>₹ 15,000</span>
                        <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">Paid</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionManager;