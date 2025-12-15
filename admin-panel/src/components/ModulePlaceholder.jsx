import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModulePlaceholder = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100 m-4">
            <div className="bg-indigo-50 p-6 rounded-full mb-6 animate-pulse">
                <Construction size={64} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">{title}</h2>
            <p className="text-gray-500 max-w-md text-lg mb-8">
                This module is currently under development. <br />
                It will be available in the next update.
            </p>
            <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
                <ArrowLeft size={20} /> Go Back
            </button>
        </div>
    );
};

export default ModulePlaceholder;