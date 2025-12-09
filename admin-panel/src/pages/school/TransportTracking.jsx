import React from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';

const TransportTracking = () => {
    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">

            {/* Sidebar List */}
            <div className="w-full md:w-1/3 bg-white p-4 rounded-xl border border-gray-200 overflow-y-auto">
                <h3 className="font-bold text-lg mb-4">Active Vehicles</h3>
                <div className="space-y-3">
                    {[1, 2, 3].map((bus) => (
                        <div key={bus} className="p-3 border rounded-lg hover:border-blue-500 cursor-pointer transition bg-gray-50">
                            <div className="flex justify-between">
                                <h4 className="font-bold text-gray-800">Bus {bus} (Route A)</h4>
                                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded animate-pulse">Moving</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Driver: Rajesh Kumar</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-blue-600 flex items-center gap-1"><MapPin size={12} /> Near City Mall</span>
                                <button className="p-1.5 bg-white border rounded-full text-green-600"><Phone size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 bg-blue-50 rounded-xl border border-gray-200 relative overflow-hidden flex items-center justify-center">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Neighborhood_Map.png')] bg-cover opacity-50"></div>

                <div className="relative z-10 bg-white p-6 rounded-xl shadow-2xl text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                        <Navigation size={32} className="text-white transform rotate-45" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Bus No. UP-16-AB-1234</h3>
                    <p className="text-gray-500">Speed: 45 km/h</p>
                    <p className="text-gray-500">Next Stop: Civil Lines (5 mins)</p>
                </div>
            </div>

        </div>
    );
};

export default TransportTracking;