import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4 dark:bg-slate-900 dark:text-gray-100">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4 dark:text-indigo-400">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-6">Page not found</p>
      <button
        onClick={() => navigate('/')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
