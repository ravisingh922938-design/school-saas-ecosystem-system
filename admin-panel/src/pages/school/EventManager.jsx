import React from 'react';
import { Calendar, Users } from 'lucide-react';

const EventManager = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Event Calendar */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Calendar size={20} /> Upcoming Events</h3>
                <div className="space-y-3">
                    <div className="flex gap-4 items-center p-3 bg-purple-50 rounded-lg">
                        <div className="bg-purple-200 text-purple-700 w-12 h-12 flex flex-col items-center justify-center rounded-lg font-bold text-xs">
                            <span>25</span><span>DEC</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-900">Christmas Celebration</h4>
                            <p className="text-xs text-purple-600">Auditorium • 10:00 AM</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center p-3 bg-orange-50 rounded-lg">
                        <div className="bg-orange-200 text-orange-700 w-12 h-12 flex flex-col items-center justify-center rounded-lg font-bold text-xs">
                            <span>26</span><span>JAN</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-orange-900">Republic Day Parade</h4>
                            <p className="text-xs text-orange-600">Ground • 08:00 AM</p>
                        </div>
                    </div>
                </div>
                <button className="mt-4 w-full border border-dashed border-gray-300 py-2 rounded text-gray-500 hover:bg-gray-50">+ Add New Event</button>
            </div>

            {/* Alumni Management */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users size={20} /> Alumni Network</h3>
                <div className="flex justify-between items-center mb-4">
                    <input type="text" placeholder="Search Alumni (Year 2020...)" className="border p-2 rounded-lg text-sm w-2/3" />
                    <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">Search</button>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50"><tr><th className="p-2">Name</th><th className="p-2">Batch</th><th className="p-2">Status</th></tr></thead>
                    <tbody>
                        <tr><td className="p-2">Vikram Singh</td><td className="p-2">2018</td><td className="p-2 text-green-600">Engineer</td></tr>
                        <tr><td className="p-2">Sneha Roy</td><td className="p-2">2019</td><td className="p-2 text-blue-600">Doctor</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default EventManager;