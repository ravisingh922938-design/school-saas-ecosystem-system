import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
  };
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Area */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">School SaaS</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link to="/" className={`block py-2.5 px-4 font-medium rounded transition ${isActive('/')}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/schools" className={`block py-2.5 px-4 font-medium rounded transition ${isActive('/schools')}`}>
                Schools Management
              </Link>
            </li>
            <li>
              <a href="#" className="block py-2.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded transition">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Super Admin Overview</h2>
          <div className="flex items-center space-x-4">
            {location.pathname === '/schools' && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Add New School
              </button>
            )}
            <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
              {/* Placeholder for Profile Image */}
              <img src="https://via.placeholder.com/40" alt="Admin" />
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;