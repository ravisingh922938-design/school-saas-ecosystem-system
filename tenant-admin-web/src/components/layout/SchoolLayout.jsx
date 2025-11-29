import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTerminology } from '../../contexts/TerminologyContext';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  BookOpen, 
  IndianRupee, 
  Bus, 
  BarChart, 
  Settings,
  Bell,
  ChevronDown,
  Home
} from 'lucide-react';

const menuItems = [
  { 
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: <LayoutDashboard size={20} /> 
  },
  { 
    name: 'Admission', 
    path: '/admission', 
    icon: <UserPlus size={20} /> 
  },
  { 
    name: 'People', 
    path: '/people', 
    icon: <Users size={20} />,
    dynamicLabel: true
  },
  { 
    name: 'Academics', 
    path: '/academics', 
    icon: <BookOpen size={20} /> 
  },
  { 
    name: 'Finance', 
    path: '/finance', 
    icon: <IndianRupee size={20} /> 
  },
  { 
    name: 'Transport', 
    path: '/transport', 
    icon: <Bus size={20} /> 
  },
  { 
    name: 'Reports', 
    path: '/reports', 
    icon: <BarChart size={20} /> 
  },
  { 
    name: 'Settings', 
    path: '/settings', 
    icon: <Settings size={20} /> 
  },
];

const SchoolLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { terms } = useTerminology();

  // Get the current path to highlight active menu item
  const currentPath = location.pathname;

  // Generate breadcrumbs from the current path
  const breadcrumbs = currentPath
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: `/${array.slice(0, index + 1).join('/')}`,
      isLast: index === array.length - 1,
    }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-white shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">
            {isSidebarOpen ? 'SchoolSaaS' : 'SS'}
          </h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const isActive = currentPath.startsWith(item.path);
            const displayName = item.dynamicName ? 
              `${item.name} ${terms[item.termKey]}` : item.name;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {isSidebarOpen && (
                  <span>{item.dynamicLabel ? `Manage ${terms.student}s` : item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                <Home size={18} />
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <span className="mx-2 text-gray-300">/</span>
                  {crumb.isLast ? (
                    <span className="text-gray-700 font-medium">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.path} className="text-gray-500 hover:text-gray-700">
                      {crumb.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {localStorage.getItem('userInitials') || 'U'}
                  </span>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SchoolLayout;
