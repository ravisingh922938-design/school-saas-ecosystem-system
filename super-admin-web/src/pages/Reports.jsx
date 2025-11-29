import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Reports = () => {
  // Dummy Data for Revenue Growth Line Chart
  const revenueData = [
    { month: 'Jan', revenue: 40 },
    { month: 'Feb', revenue: 30 },
    { month: 'Mar', revenue: 60 },
    { month: 'Apr', revenue: 50 },
    { month: 'May', revenue: 70 },
    { month: 'Jun', revenue: 90 },
    { month: 'Jul', revenue: 80 },
    { month: 'Aug', revenue: 100 },
    { month: 'Sep', revenue: 110 },
    { month: 'Oct', revenue: 130 },
    { month: 'Nov', revenue: 120 },
    { month: 'Dec', revenue: 150 },
  ];

  // Dummy Data for Tenant Distribution Pie Chart
  const tenantDistributionData = [
    { name: 'Schools', value: 60, color: '#4f46e5' }, // Indigo
    { name: 'Coachings', value: 30, color: '#a855f7' }, // Purple
    { name: 'Colleges', value: 10, color: '#f97316' }, // Orange
  ];

  // Dummy Data for Student Enrollment Trend Bar Chart
  const studentEnrollmentData = [
    { name: 'Last Month', students: 12000 },
    { name: 'This Month', students: 15000 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Analytics & Reports</h1>

      {/* Chart 1: Revenue Growth (Line Chart) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-slate-800 dark:border dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Revenue Growth (in Lakhs)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" /> {/* dark:stroke-slate-500 */}
            <XAxis dataKey="month" stroke="#94a3b8" /> {/* dark:stroke-slate-400 */}
            <YAxis stroke="#94a3b8" /> {/* dark:stroke-slate-400 */}
            <Tooltip formatter={(value) => `₹${value} Lakhs`} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} /> {/* dark:bg-slate-900, dark:border-slate-700, dark:text-gray-100 */}
            <Legend wrapperStyle={{ color: '#f1f5f9' }} /> {/* dark:text-gray-100 */}
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart 2: Tenant Distribution (Pie Chart) */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Tenant Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tenantDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {tenantDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.name]} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} /> {/* dark:bg-slate-900, dark:border-slate-700, dark:text-gray-100 */}
              <Legend wrapperStyle={{ color: '#f1f5f9' }} /> {/* dark:text-gray-100 */}
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Student Enrollment Trend (Bar Chart) */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Student Enrollment Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" /> {/* dark:stroke-slate-500 */}
              <XAxis dataKey="name" stroke="#94a3b8" /> {/* dark:stroke-slate-400 */}
              <YAxis stroke="#94a3b8" /> {/* dark:stroke-slate-400 */}
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} /> {/* dark:bg-slate-900, dark:border-slate-700, dark:text-gray-100 */}
              <Legend wrapperStyle={{ color: '#f1f5f9' }} /> {/* dark:text-gray-100 */}
              <Bar dataKey="students" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
