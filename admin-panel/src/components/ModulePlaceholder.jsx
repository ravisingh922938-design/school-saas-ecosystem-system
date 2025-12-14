import React from 'react';
import { Construction } from 'lucide-react';

const ModulePlaceholder = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="bg-indigo-50 p-6 rounded-full mb-4 animate-pulse">
                <Construction size={64} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title} Module</h2>
            <p className="text-gray-500 max-w-md">
                This feature is currently under development. It will be available in the next update of SchoolOS.
            </p>
            <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Go Back to Dashboard
            </button>
        </div>
    );
};

export default ModulePlaceholder;