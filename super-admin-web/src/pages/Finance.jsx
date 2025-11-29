import React, { useState, useEffect } from 'react';
import { Download, Banknote } from 'lucide-react';

const Finance = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('October 2023');

  // Dummy data for months
  const months = [
    'October 2023',
    'September 2023',
    'August 2023',
    'July 2023',
  ];

  const fetchLedgerData = async () => {
    try {
      setLoading(true);
      // Simulate API call to fetch revenue ledger data
      const dummyCommissionTenants = [
        {
          id: 1,
          schoolName: "Alpha High School",
          totalStudents: 1200,
          feesCollected: 500000,
          commissionRate: 0.10, // 10%
        },
        {
          id: 2,
          schoolName: "City Montessori",
          totalStudents: 3200,
          feesCollected: 1000000,
          commissionRate: 0.05, // 5%
        },
        {
          id: 3,
          schoolName: "Ace Tutorials",
          totalStudents: 120,
          feesCollected: 80000,
          commissionRate: 0.15, // 15%
        },
      ];

      const formattedData = dummyCommissionTenants.map((tenant) => ({
        ...tenant,
        adminShareDue: tenant.feesCollected * tenant.commissionRate,
      }));

      setLedgerData(formattedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerData();
  }, [selectedMonth]); // Refetch when month changes

  const handleDownloadReport = () => {
    alert('Downloading report for ' + selectedMonth);
    // Implement actual report download logic
  };

  const handleDebitFromBank = (tenantId) => {
    alert(`Simulating debit from bank for tenant ${tenantId}`);
    // Implement actual debit logic here, then refetch data
    fetchLedgerData();
  };

  const grandTotalDue = ledgerData.reduce(
    (sum, tenant) => sum + tenant.adminShareDue,
    0
  );

  if (loading) {
    return <div className="container mx-auto p-4">Loading revenue ledger...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 relative min-h-screen pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Revenue Ledger</h1>
        <button
          onClick={handleDownloadReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Download size={20} /> Download Report
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Filter by Month:</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto mb-20">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg dark:bg-slate-800 dark:border-slate-700">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-100 dark:border-slate-700 dark:text-gray-300">
              <th className="py-3 px-4 font-medium text-left">School Name</th>
              <th className="py-3 px-4 font-medium text-left">Total Students</th>
              <th className="py-3 px-4 font-medium text-left">Total Fees Collected</th>
              <th className="py-3 px-4 font-medium text-left">Commission Rate</th>
              <th className="py-3 px-4 font-medium text-left">Admin Share/Due</th>
              <th className="py-3 px-4 font-medium text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.length > 0 ? (
              ledgerData.map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-50 hover:bg-gray-50 transition dark:border-slate-700 dark:hover:bg-slate-700">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${tenant.schoolName.split(' ').join('+')}&background=random`}
                      alt="logo"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold text-gray-700 dark:text-gray-100">{tenant.schoolName}</span>
                  </td>
                  <td className="py-4 px-4 font-bold dark:text-gray-100">{tenant.totalStudents}</td>
                  <td className="py-4 px-4 dark:text-gray-100">₹ {tenant.feesCollected?.toLocaleString('en-IN') || '0'}</td>
                  <td className="py-4 px-4 dark:text-gray-100">{(tenant.commissionRate * 100).toFixed(0)}%</td>
                  <td className="py-4 px-4 text-red-600 font-semibold dark:text-red-400">
                    -₹{tenant.adminShareDue?.toLocaleString('en-IN') || '0'} Due
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDebitFromBank(tenant.id)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 text-sm flex items-center gap-1 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                    >
                      <Banknote size={16} /> Debit from Bank
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500 dark:text-gray-300">
                  No commission-based tenants found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Grand Total Due Sticky Card */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-between min-w-[250px] dark:bg-slate-700 dark:border dark:border-slate-600">
        <span className="text-lg font-semibold dark:text-gray-100">Grand Total Due:</span>
        <span className="text-xl font-bold text-red-400">₹ {grandTotalDue?.toLocaleString('en-IN') || '0'}</span>
      </div>
    </div>
  );
};

export default Finance;
