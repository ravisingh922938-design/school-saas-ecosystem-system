import React, { useState, useEffect } from 'react';
import { Wallet, Building, Users, AlertCircle, Plus, Ticket, FileText, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchStats } from '../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ tenants: 0, students: 0, revenue: 0, dues: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const response = await fetchStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4 dark:text-gray-100">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">Overview</h1>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200 dark:bg-slate-800 dark:shadow-lg dark:border dark:border-slate-700">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1 dark:text-gray-100">₹ {stats.revenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Total Schools/Coachings Card */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200 dark:bg-slate-800 dark:shadow-lg dark:border dark:border-slate-700">
          <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Schools/Coachings</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1 dark:text-gray-100">{stats.tenants}</p>
          </div>
        </div>

        {/* TOTAL STUDENTS (Global) Card */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200 dark:bg-slate-800 dark:shadow-lg dark:border dark:border-slate-700">
          <div className="p-3 mr-4 text-indigo-500 bg-indigo-100 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">TOTAL STUDENTS (Global)</p>
            <p className="text-4xl font-extrabold text-indigo-700 mt-1">{stats.students.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Pending Dues Card */}
        <div className="flex items-center p-6 bg-red-50 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 dark:bg-red-950 dark:border dark:border-red-900">
          <div className="p-3 mr-4 text-red-600 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-300">Pending Dues</p>
            <p className="text-2xl font-semibold text-red-800 mt-1 dark:text-red-100">₹ {stats.dues.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Add New Tenant Button */}
        <div
          onClick={() => navigate('/tenants/add')}
          className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 hover:scale-105 transition-transform duration-200 dark:bg-blue-950 dark:hover:bg-blue-900 dark:border dark:border-blue-900"
        >
          <Plus className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">Add New Tenant</p>
        </div>

        {/* View Pending Tickets Button */}
        <div
          onClick={() => navigate('/support-tickets')}
          className="flex flex-col items-center justify-center p-6 bg-yellow-50 rounded-lg shadow-md cursor-pointer hover:bg-yellow-100 hover:scale-105 transition-transform duration-200 dark:bg-yellow-950 dark:hover:bg-yellow-900 dark:border dark:border-yellow-900"
        >
          <Ticket className="w-8 h-8 text-yellow-600 mb-2" />
          <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">View Pending Tickets</p>
        </div>

        {/* Generate Monthly Report Button */}
        <div
          onClick={() => alert('Generating Monthly Report...')}
          className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg shadow-md cursor-pointer hover:bg-green-100 hover:scale-105 transition-transform duration-200 dark:bg-green-950 dark:hover:bg-green-900 dark:border dark:border-green-900"
        >
          <FileText className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-lg font-semibold text-green-800 dark:text-green-200">Generate Monthly Report</p>
        </div>

        {/* System Settings Button */}
        <div
          onClick={() => navigate('/settings')}
          className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform duration-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border dark:border-slate-600"
        >
          <Settings className="w-8 h-8 text-gray-600 mb-2 dark:text-gray-300" />
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">System Settings</p>
        </div>
      </div>

      {/* Removed Schools List table as per new request focus on global stats */}
    </div>
  );
};

export default Dashboard;
