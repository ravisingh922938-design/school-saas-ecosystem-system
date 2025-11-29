import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">My School</h1>
          <p className="text-xs text-gray-500 mt-1">Tenant Admin Panel</p>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          <a href="#" className="block px-4 py-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg">Dashboard</a>
          <a href="#" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">Students Management</a>
          <a href="#" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">Teachers Staff</a>
          <a href="#" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">Fee Collection</a>
          <a href="#" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition">Timetable</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Principal Dashboard</h1>
            <p className="text-gray-500">Welcome back, Principal Sir!</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Active Session 2024-25</span>
            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">Logout</button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">450</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Teachers</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">28</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Today's Attendance</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">92%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Pending Fees</h3>
            <p className="text-3xl font-bold mt-2 text-red-600">₹ 1.2L</p>
          </div>
        </div>

        {/* Recent Admissions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Admissions</h3>
            <button className="text-indigo-600 text-sm hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-500">Student Name</th>
                <th className="p-4 text-sm font-medium text-gray-500">Class</th>
                <th className="p-4 text-sm font-medium text-gray-500">Date</th>
                <th className="p-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4">Rohan Sharma</td>
                <td className="p-4">Class 5-A</td>
                <td className="p-4">29 Nov 2025</td>
                <td className="p-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">Admitted</span></td>
              </tr>
              <tr>
                <td className="p-4">Anjali Verma</td>
                <td className="p-4">Class 8-B</td>
                <td className="p-4">28 Nov 2025</td>
                <td className="p-4"><span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs">Pending Docs</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;