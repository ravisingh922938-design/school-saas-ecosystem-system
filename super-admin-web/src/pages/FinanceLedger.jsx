import React, { useState, useEffect } from 'react';

const FinanceLedger = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinanceLedgerData = async () => {
    try {
      setLoading(true);
      // Simulate API call for finance ledger data
      const dummyData = [
        {
          id: '1',
          schoolName: 'Alpha High School',
          totalStudents: 1200,
          feesCollected: 500000,
          revenueModel: 'Commission',
        },
        {
          id: '2',
          schoolName: 'Beta Coaching',
          totalStudents: 450,
          feesCollected: 250000,
          revenueModel: 'Subscription',
        },
        {
          id: '3',
          schoolName: 'Gamma College',
          totalStudents: 2500,
          feesCollected: 800000,
          revenueModel: 'Commission',
        },
        {
          id: '4',
          schoolName: 'Delta Public School',
          totalStudents: 900,
          feesCollected: 300000,
          revenueModel: 'Commission',
        },
      ];

      const commissionSchools = dummyData
        .filter((school) => school.revenueModel === 'Commission')
        .map((school) => ({
          ...school,
          adminShareDue: school.feesCollected * 0.10, // 10% commission
        }));

      setSchools(commissionSchools);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceLedgerData();
  }, []);

  const handleDebitFromBank = (schoolId) => {
    alert(`Simulating debit from bank for school ${schoolId}`);
    // In a real application, you would make an API call here to clear dues
    // After successful debit, you would refetch the data:
    // fetchFinanceLedgerData();
  };

  const totalAdminSharePending = schools.reduce(
    (sum, school) => sum + school.adminShareDue,
    0
  );

  if (loading) {
    return <div className="container mx-auto p-4">Loading finance ledger...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">Finance Ledger (Commission Model)</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg dark:bg-slate-800 dark:border-slate-700">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold dark:border-slate-700 dark:text-gray-300">School Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold dark:border-slate-700 dark:text-gray-300">Total Students</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold dark:border-slate-700 dark:text-gray-300">Fees Collected</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold dark:border-slate-700 dark:text-gray-300">Admin Share Due</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold dark:border-slate-700 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {schools.length > 0 ? (
              schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="py-3 px-4 border-b dark:border-slate-700 dark:text-gray-100">{school.schoolName}</td>
                  <td className="py-3 px-4 border-b font-bold dark:border-slate-700 dark:text-gray-100">{school.totalStudents}</td>
                  <td className="py-3 px-4 border-b dark:border-slate-700 dark:text-gray-100">₹ {school.feesCollected?.toLocaleString('en-IN') || '0'}</td>
                  <td className="py-3 px-4 border-b text-red-600 dark:border-slate-700 dark:text-red-400">
                    10% = ₹ {school.adminShareDue?.toLocaleString('en-IN') || '0'}
                  </td>
                  <td className="py-3 px-4 border-b dark:border-slate-700">
                    <button
                      onClick={() => handleDebitFromBank(school.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                      Debit from Bank
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500 dark:text-gray-300">
                  No commission-model schools found.
                </td>
              </tr>
            )}
            {schools.length > 0 && (
              <tr className="bg-gray-50 font-bold dark:bg-slate-700">
                <td className="py-3 px-4 border-b dark:border-slate-600 dark:text-gray-100" colSpan="3">Total Admin Share Pending</td>
                <td className="py-3 px-4 border-b text-red-600 dark:border-slate-600 dark:text-red-400" colSpan="2">
                  ₹ {totalAdminSharePending?.toLocaleString('en-IN') || '0'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceLedger;
