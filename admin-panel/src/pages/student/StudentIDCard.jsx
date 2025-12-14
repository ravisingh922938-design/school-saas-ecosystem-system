import React from 'react';
import { QrCode, Share2 } from 'lucide-react';

const StudentIDCard = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 pb-24">

            <h2 className="text-white text-xl font-bold mb-6">Digital ID Card</h2>

            {/* ID Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative">

                {/* Top Header */}
                <div className="bg-indigo-600 h-24 relative">
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <img
                            src="https://ui-avatars.com/api/?name=Aryan&background=fff"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="pt-14 pb-8 px-6 text-center">
                    <h1 className="text-2xl font-extrabold text-gray-800">Aryan Sharma</h1>
                    <p className="text-gray-500 font-medium">Class 10-A • Roll No 21</p>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">DOB</p>
                            <p className="text-sm font-semibold text-gray-800">12 Aug 2008</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Blood Group</p>
                            <p className="text-sm font-semibold text-gray-800">O+</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Emergency</p>
                            <p className="text-sm font-semibold text-gray-800">+91 9876543210</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Valid Upto</p>
                            <p className="text-sm font-semibold text-gray-800">Mar 2026</p>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <QrCode size={80} className="text-gray-800" />
                        <p className="text-[10px] text-gray-400">Scan to verify student identity</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-indigo-50 p-3 text-center border-t border-indigo-100">
                    <p className="text-xs text-indigo-600 font-bold">Delhi Public School</p>
                </div>
            </div>

            <button className="mt-8 flex items-center gap-2 text-white bg-white/10 px-6 py-3 rounded-full backdrop-blur-md hover:bg-white/20 transition">
                <Share2 size={18} /> Share ID
            </button>

        </div>
    );
};

export default StudentIDCard;