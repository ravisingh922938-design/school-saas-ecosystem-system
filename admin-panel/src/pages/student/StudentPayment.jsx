import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

const StudentPayment = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">₹ 2,500</h1>
                <p className="text-gray-500 text-sm">Tuition + Transport Fee</p>
            </div>
            <div className="space-y-3">
                {['UPI (GPay, PhonePe)', 'Credit / Debit Card', 'Net Banking'].map((m, i) => (
                    <label key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer">
                        <input type="radio" name="pay" className="w-5 h-5" defaultChecked={i === 0} />
                        <span className="font-medium text-gray-700">{m}</span>
                    </label>
                ))}
            </div>
            <button className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl">Pay Securely</button>
        </div>
    );
};
export default StudentPayment;