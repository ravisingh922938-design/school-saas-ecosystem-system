import React from 'react';
import { ScanBarcode, BookOpen, User, Check } from 'lucide-react';

const LibraryScanner = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Issue / Return</h2>
                <p className="text-gray-500 mb-8">Scan student ID card or Book Barcode</p>

                {/* Scanner Simulation */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Click here & Scan Barcode..."
                        className="w-full pl-12 pr-4 py-4 border-2 border-dashed border-blue-300 rounded-xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                        autoFocus
                    />
                    <ScanBarcode className="absolute left-4 top-5 text-gray-400" size={24} />
                </div>

                {/* Scanned Data Preview */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-left grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Student</p>
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full border"><User size={20} /></div>
                            <div>
                                <p className="font-bold text-gray-800">Arav Sharma</p>
                                <p className="text-xs text-gray-500">ID: 202501</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Book</p>
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full border"><BookOpen size={20} /></div>
                            <div>
                                <p className="font-bold text-gray-800">Concepts of Physics</p>
                                <p className="text-xs text-gray-500">ISBN: 978-81...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                        <Check size={20} /> Issue Book
                    </button>
                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold">
                        Return Book
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LibraryScanner;