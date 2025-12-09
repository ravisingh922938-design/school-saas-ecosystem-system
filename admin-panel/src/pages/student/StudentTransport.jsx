import React from 'react';
import { Phone } from 'lucide-react';

const StudentTransport = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Live Bus Tracking</h2>
            <div className="w-full h-64 bg-gray-200 rounded-3xl mb-6 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10 animate-bounce">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold">Bus is 10 mins away</span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <img src="https://ui-avatars.com/api/?name=Driver" className="w-12 h-12 rounded-full" />
                <div className="flex-1"><h4 className="font-bold text-gray-800">Ramesh Kumar</h4><p className="text-xs text-gray-500">Bus No: UP-16-AB-1234</p></div>
                <button className="bg-green-100 text-green-600 p-3 rounded-full"><Phone size={20} /></button>
            </div>
        </div>
    );
};
export default StudentTransport;