import React from 'react';
import { Ghost } from 'lucide-react'; // Default icon

const EmptyState = ({ title, description, buttonText, onButtonClick, icon: Icon = Ghost }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md text-center dark:bg-slate-800 dark:border dark:border-slate-700">
      <div className="bg-gray-100 dark:bg-slate-700 rounded-full p-4 mb-4">
        <Icon className="w-16 h-16 text-gray-400 dark:text-gray-300" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">{title}</h2>
      <p className="text-gray-600 mb-4 dark:text-gray-300">{description}</p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
