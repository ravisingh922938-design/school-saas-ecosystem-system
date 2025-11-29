import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ImpersonationProvider, useImpersonation } from './context/ImpersonationContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import ManageTenants from './pages/ManageTenants';
import AddTenant from './pages/AddTenant';
import FinanceLedger from './pages/FinanceLedger';
import Login from './pages/Login';
import Settings from './pages/Settings';
import SchoolDashboard from './pages/SchoolDashboard';
import ActivityLogs from './pages/ActivityLogs';
import SupportTickets from './pages/SupportTickets';
import ProfilePage from './pages/ProfilePage';
import ManagePlans from './pages/ManagePlans';
import Reports from './pages/Reports';
import StoreOrders from './pages/StoreOrders';
import NotFound from './pages/NotFound';
import CommandPalette from './components/CommandPalette';
import { ThemeProvider } from './context/ThemeContext';
import Schools from './pages/Schools';
import './App.css';

// HomeStats component to show summary cards
const HomeStats = () => (
  <>
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

    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
      <p className="text-gray-500">No recent activities found.</p>
    </div>
  </>
);

const AppContent = () => {
  const { isImpersonating, impersonatedTenant, stopImpersonation } = useImpersonation();
  const navigate = useNavigate();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleReturnToSuperAdmin = () => {
    stopImpersonation();
    navigate('/tenants'); // Redirect to tenants page after stopping impersonation
  };

  return (
    <>
      {isImpersonating && (
        <div
          className="bg-orange-500 text-white p-2 text-center text-sm cursor-pointer sticky top-0 z-50 hover:bg-orange-600"
          onClick={handleReturnToSuperAdmin}
        >
          ⚠️ You are viewing as <span className="font-bold">{impersonatedTenant?.name}</span>. Click here to return to Super Admin.
        </div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <DashboardLayout>
            <HomeStats />
          </DashboardLayout>
        } />
        <Route path="/schools" element={
          <DashboardLayout>
            <Schools />
          </DashboardLayout>
        } />
        <Route path="/school-dashboard" element={<SchoolDashboard />} />
        <Route path="/tenants" element={<ManageTenants />} />
        <Route path="/tenants/add" element={<AddTenant />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/finance-ledger" element={<FinanceLedger />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />
        <Route path="/support-tickets" element={<SupportTickets />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/plans" element={<ManagePlans />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/store-orders" element={<StoreOrders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} /> {/* Command Palette */}
    </>
  );
};

function App() {
  return (
    <Router>
      <ImpersonationProvider>
        <ThemeProvider> {/* Wrap with ThemeProvider */}
          <AppContent />
        </ThemeProvider>
      </ImpersonationProvider>
    </Router>
  );
}

export default App;
