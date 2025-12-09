import React from 'react';
import { Save, Percent, DollarSign } from 'lucide-react';

const CommissionSettings = () => {
    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Revenue & Commission Rules</h2>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-8">

                {/* 1. Admission Commission */}
                <div>
                    <h3 className="font-bold text-lg text-slate-700 mb-3 flex items-center gap-2">
                        <Percent size={20} className="text-blue-500" /> Admission Commission
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">Percentage of admission fee that goes to Super Admin.</p>
                    <div className="flex gap-4 items-center">
                        <input type="number" defaultValue="10" className="border p-3 rounded-lg w-32 font-bold text-lg" />
                        <span className="text-slate-600 font-bold">% per admission</span>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* 2. Platform Surcharge */}
                <div>
                    <h3 className="font-bold text-lg text-slate-700 mb-3 flex items-center gap-2">
                        <DollarSign size={20} className="text-green-500" /> Platform Surcharge (Parent Pays)
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">Fixed amount added to every fee transaction.</p>
                    <div className="flex gap-4 items-center">
                        <span className="text-slate-600 font-bold text-xl">₹</span>
                        <input type="number" defaultValue="30" className="border p-3 rounded-lg w-32 font-bold text-lg" />
                        <span className="text-slate-600 font-bold">per transaction</span>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
                        <Save size={20} /> Save Rules
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CommissionSettings;