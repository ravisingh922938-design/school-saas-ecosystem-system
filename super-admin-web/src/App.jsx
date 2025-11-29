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
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage component
import ManagePlans from './pages/ManagePlans'; // New import
import Reports from './pages/Reports'; // New import
import StoreOrders from './pages/StoreOrders'; // New import for Store Orders
import NotFound from './pages/NotFound'; // New import
import CommandPalette from './components/CommandPalette'; // New import
import { ThemeProvider } from './context/ThemeContext'; // New import
import './App.css';

const AppContent = () => {
  const { isImpersonating, impersonatedTenant, stopImpersonation } = useImpersonation();
  const navigate = useNavigate();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false); // New state for command palette

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
        <Route path="/school-dashboard" element={<SchoolDashboard />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tenants" element={<ManageTenants />} />
          <Route path="tenants/add" element={<AddTenant />} />
          <Route path="finance" element={<Finance />} />
          <Route path="finance-ledger" element={<FinanceLedger />} />
          <Route path="settings" element={<Settings />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="support-tickets" element={<SupportTickets />} />
          <Route path="profile" element={<ProfilePage />} /> {/* New ProfilePage Route */}
          <Route path="plans" element={<ManagePlans />} /> {/* New ManagePlans Route */}
          <Route path="reports" element={<Reports />} /> {/* New Reports Route */}
          <Route path="store-orders" element={<StoreOrders />} /> {/* Store Orders Route */}
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
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
