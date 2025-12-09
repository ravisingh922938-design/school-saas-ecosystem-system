import React from 'react';
import { Home, Utensils } from 'lucide-react';

const HostelManager = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hostel Management</h2>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[101, 102, 103, 104, 105].map((room) => (
                    <div key={room} className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-blue-800">Room {room}</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">2/4 Beds Filled</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded text-blue-600 flex items-center justify-center cursor-help" title="Occupied: Arav"><Home size={16} /></div>
                            <div className="w-8 h-8 bg-blue-100 rounded text-blue-600 flex items-center justify-center cursor-help" title="Occupied: Rahul"><Home size={16} /></div>
                            <div className="w-8 h-8 bg-gray-100 rounded text-gray-400 flex items-center justify-center border-2 border-dashed border-gray-300"></div>
                            <div className="w-8 h-8 bg-gray-100 rounded text-gray-400 flex items-center justify-center border-2 border-dashed border-gray-300"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mess Menu */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Utensils size={20} /> Weekly Mess Menu</h3>
                <table className="w-full text-sm text-left">
                    <thead className="bg-orange-50"><tr><th className="p-3">Day</th><th className="p-3">Breakfast</th><th className="p-3">Lunch</th><th className="p-3">Dinner</th></tr></thead>
                    <tbody>
                        <tr className="border-b"><td className="p-3 font-bold">Monday</td><td className="p-3">Poha & Milk</td><td className="p-3">Rajma Rice</td><td className="p-3">Roti & Mix Veg</td></tr>
                        <tr className="border-b"><td className="p-3 font-bold">Tuesday</td><td className="p-3">Paratha</td><td className="p-3">Chole Bhature</td><td className="p-3">Dal Makhani</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HostelManager;