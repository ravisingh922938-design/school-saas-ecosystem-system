import React from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';

const Coupons = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Coupon Management</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={18} /> Create Coupon
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Coupon Card */}
                <div className="bg-white p-6 rounded-xl border border-dashed border-green-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">ACTIVE</div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-600"><Tag /></div>
                        <div>
                            <h3 className="font-bold text-lg">WELCOME50</h3>
                            <p className="text-xs text-slate-500">Flat 50% Off</p>
                        </div>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                        <p>Valid For: <span className="font-bold">New Schools</span></p>
                        <p>Expires: <span className="font-bold">31 Dec 2025</span></p>
                        <p>Usage: <span className="font-bold">12/100</span></p>
                    </div>
                    <button className="mt-4 w-full py-2 border border-red-200 text-red-500 rounded hover:bg-red-50 flex items-center justify-center gap-2">
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Coupons;