import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const SchoolDashboard = () => {
  const [schoolName, setSchoolName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would fetch the school details using the token
    // For now, we'll just show a generic name
    setSchoolName('Demo School');
  }, []);

  const handleExitImpersonation = () => {
    localStorage.removeItem('impersonateToken');
    navigate('/tenants');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-sm text-yellow-700">
              <span className="font-medium">Viewing as {schoolName}</span> - You are currently in impersonation mode.
            </p>
          </div>
          <Button 
            onClick={handleExitImpersonation}
            variant="outline"
            className="ml-4 border-yellow-500 text-yellow-700 hover:bg-yellow-50"
          >
            Exit Impersonation
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">School Dashboard</h2>
            <p className="mt-2 text-gray-500">This is a placeholder for the school dashboard content.</p>
            <p className="mt-2 text-sm text-gray-500">You are currently viewing as: {schoolName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
