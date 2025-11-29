import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [schools, setSchools] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorSchools, setErrorSchools] = useState(null);
  const [errorStats, setErrorStats] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/super-admin/schools');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        setErrorSchools(error);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('/api/super-admin/dashboard-stats');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDashboardStats(data);
      } catch (error) {
        setErrorStats(error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loadingSchools || loadingStats) {
    return <div className="container mx-auto p-4">Loading dashboard...</div>;
  }

  if (errorSchools) {
    return <div className="container mx-auto p-4 text-red-600">Error fetching schools: {errorSchools.message}</div>;
  }

  if (errorStats) {
    return <div className="container mx-auto p-4 text-red-600">Error fetching dashboard stats: {errorStats.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schools Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Schools</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardStats?.totalSchools || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Schools</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{dashboardStats?.activeSchools || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">{dashboardStats?.totalStudents || 0}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Code</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Total Students</th>
              <th className="py-2 px-4 border-b text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {schools.length > 0 ? (
              schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{school.schoolName}</td>
                  <td className="py-2 px-4 border-b">{school.instituteCode}</td>
                  <td className="py-2 px-4 border-b">{school.totalStudents || 0}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {school.status || 'inactive'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  No schools found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
