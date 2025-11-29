import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Schools from './pages/Schools';

// Ye raha aapka Dashboard ka Design (Cards wala)
const HomeStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">Total Schools</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">Active Students</h3>
      <p className="text-3xl font-bold text-green-600 mt-2">1,240</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">₹ 4.5L</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      {/* DashboardLayout aapka Sidebar aur Header hai */}
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomeStats />} />
          <Route path="/schools" element={<Schools />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;