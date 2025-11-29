import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Users, DollarSign, Settings, Menu, X, Bell, UserPlus, AlertCircle, CheckCircle, MessageSquare, User, Package, BarChart2, Sun, Moon, ShoppingCart } from 'lucide-react';
import { useImpersonation } from '../context/ImpersonationContext';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isImpersonating, impersonatedTenant, stopImpersonation } = useImpersonation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const dummyNotifications = [
    {
      id: 1,
      message: "New Tenant Registered: Delta Academy",
      time: "2 mins ago",
      icon: UserPlus,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      message: "Payment Failed: Alpha School",
      time: "1 hour ago",
      icon: AlertCircle,
      iconColor: "text-red-500",
    },
    {
      id: 3,
      message: "System Update Completed",
      time: "1 day ago",
      icon: CheckCircle,
      iconColor: "text-blue-500",
    },
  ];

  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleReturnToSuperAdmin = () => {
    stopImpersonation();
    navigate('/tenants');
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const markAllAsRead = () => {
    setNotifications([]); // Clear all notifications
    setNotificationsOpen(false);
    alert("All notifications marked as read!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {isImpersonating && (
        <div
          className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white p-2 text-center text-sm cursor-pointer hover:bg-orange-600 transition-colors"
          onClick={handleReturnToSuperAdmin}
        >
          ⚠️ You are viewing as <span className="font-bold">{impersonatedTenant?.name}</span>. Click here to return to Super Admin.
        </div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 overflow-y-auto transition duration-300 ease-in-out transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            {/* Logo Area */}
            <span className="text-white text-2xl font-semibold">Super Admin</span>
          </div>
        </div>

        <nav className="mt-10">
          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/"
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="h-6 w-6" />
            <span className="mx-3">Dashboard</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/tenants"
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="h-6 w-6" />
            <span className="mx-3">Manage Tenants</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/tenants/add"
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="h-6 w-6" />
            <span className="mx-3">Add Tenant</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/finance"
            onClick={() => setSidebarOpen(false)}
          >
            <DollarSign className="h-6 w-6" />
            <span className="mx-3">Finance</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/finance-ledger"
            onClick={() => setSidebarOpen(false)}
          >
            <DollarSign className="h-6 w-6" />
            <span className="mx-3">Finance Ledger</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/settings"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings className="h-6 w-6" />
            <span className="mx-3">Settings</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/support-tickets"
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="mx-3">Support Tickets</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/profile"
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="h-6 w-6" />
            <span className="mx-3">Profile</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/plans"
            onClick={() => setSidebarOpen(false)}
          >
            <Package className="h-6 w-6" />
            <span className="mx-3">Manage Plans</span>
          </Link>

          <Link
            className="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
            to="/reports"
            onClick={() => setSidebarOpen(false)}
          >
            <BarChart2 className="h-6 w-6" />
            <span className="mx-3">Reports</span>
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-slate-900" style={{ marginTop: isImpersonating ? '36px' : '0', marginLeft: sidebarOpen ? '0' : '0' }}>
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600 dark:bg-slate-800 dark:border-slate-700">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden dark:text-gray-300 dark:focus:text-gray-100"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800 ml-3 dark:text-gray-100">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="text-gray-500 focus:outline-none focus:text-gray-700 p-1 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button onClick={toggleNotifications} className="relative text-gray-500 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:focus:text-gray-100">
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {notifications.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-20 dark:bg-slate-700 dark:border dark:border-slate-600">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b dark:text-gray-100 dark:border-slate-600">Notifications</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">No new notifications.</div>
                  )
                }
                <div className="px-4 py-2">
                  <button
                    onClick={markAllAsRead}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md focus:outline-none"
                  >
                    Mark all as read
                  </button>
                  <div className="px-4 py-2">
                    <button
                      onClick={markAllAsRead}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md focus:outline-none"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Badge */}
            <div className="relative">
              <button className="flex items-center max-w-xs text-sm rounded-full bg-gray-800 focus:outline-none focus:shadow-outline">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                />
                <span className="ml-2 text-white text-sm font-medium">Super Admin</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-slate-900">
          <div className="container mx-auto px-6 py-8">
            <Outlet /> {/* Use Outlet to render child routes */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
