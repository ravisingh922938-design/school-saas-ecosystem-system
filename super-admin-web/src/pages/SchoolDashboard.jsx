import React from 'react';
import { useImpersonation } from '../context/ImpersonationContext';

const SchoolDashboard = () => {
  const { impersonatedTenant } = useImpersonation();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">School Dashboard</h1>
      {impersonatedTenant ? (
        <p className="dark:text-gray-100">You are currently viewing the dashboard for <span className="font-semibold text-blue-600 dark:text-blue-400">{impersonatedTenant.name}</span>.</p>
      ) : (
        <p className="dark:text-gray-100">Not impersonating any school.</p>
      )}
      <p className="mt-4 dark:text-gray-100">This is a dummy school dashboard page.</p>
    </div>
  );
};

export default SchoolDashboard;
