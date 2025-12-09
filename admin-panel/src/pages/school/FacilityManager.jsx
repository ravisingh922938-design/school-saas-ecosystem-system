import React from 'react';
import { Bus, MapPin, Book } from 'lucide-react';

// You can separate these into TransportManager.jsx and LibraryManager.jsx later
export const TransportManager = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Bus /> Transport Management</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Route A (City Center)</h4>
                <p className="text-sm text-gray-500">Driver: Ramesh (9876...)</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-2"><MapPin size={14} /> Bus is Moving</p>
            </div>
        </div>
    </div>
);

export const LibraryManager = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Book /> Library</h2>
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50"><tr><th className="p-2">Book Name</th><th className="p-2">Issued To</th><th className="p-2">Due Date</th></tr></thead>
            <tbody>
                <tr><td className="p-2">Physics Vol 1</td><td className="p-2">Arav (10-A)</td><td className="p-2 text-red-600">Yesterday</td></tr>
            </tbody>
        </table>
    </div>
);