import React from 'react';
import { Phone, MapPin, Navigation } from 'lucide-react';

const StudentTransport = () => {
    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 px-1">Bus Tracking 🚌</h2>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-3xl mb-6 relative overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Mapbox_iOS_SDK_-_Street_Map.png')] bg-cover opacity-60"></div>
                <div className="relative z-10 bg-white p-3 rounded-full shadow-xl animate-bounce">
                    <Navigation size={32} className="text-blue-600 fill-blue-600" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-xs font-bold text-gray-700 shadow-sm text-center">
                    Bus is 2 km away from your stop
                </div>
            </div>

            {/* Driver Info */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <img src="https://ui-avatars.com/api/?name=Ramesh+Driver&background=random" className="w-12 h-12 rounded-full" />
                    <div>
                        <h3 className="font-bold text-gray-900">Ramesh Kumar</h3>
                        <p className="text-xs text-gray-500">Driver • Bus No. UP-16-AB-1234</p>
                    </div>
                    <button className="ml-auto bg-green-500 text-white p-3 rounded-full shadow-lg active:scale-95 transition">
                        <Phone size={20} />
                    </button>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Route:</span>
                        <span className="font-bold text-gray-800">Route 5 (City Loop)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-gray-500">Pickup Time:</span>
                        <span className="font-bold text-blue-600">07:45 AM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentTransport;