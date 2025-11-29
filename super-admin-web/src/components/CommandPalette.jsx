import React, { useState, useEffect, useRef } from 'react';
import { Search, LayoutDashboard, Users, Plus, DollarSign, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import tenantsData from '../data'; // Import dummy tenant data

const CommandPalette = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const commandItems = [
    { group: 'Navigation', name: 'Go to Dashboard', path: '/', icon: LayoutDashboard },
    { group: 'Navigation', name: 'Search Tenants', path: '/tenants', icon: Users },
    { group: 'Actions', name: 'Add New Tenant', path: '/tenants/add', icon: Plus },
    { group: 'Navigation', name: 'View Finance', path: '/finance', icon: DollarSign },
    { group: 'Actions', name: 'Logout', path: '/login', icon: LogOut },
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (item) => {
    navigate(item.path);
    onClose();
  };

  const filteredItems = commandItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic tenant suggestions
  const tenantSuggestions = tenantsData
    .filter(tenant => tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() !== '')
    .map(tenant => ({
      group: 'Manage Tenants',
      name: `Manage Tenant: ${tenant.name}`,
      path: `/tenants?search=${encodeURIComponent(tenant.name)}`, // Placeholder for specific tenant management route
      icon: Users,
      id: `tenant-${tenant.id}`,
    }));

  const allFilteredItems = [...tenantSuggestions, ...filteredItems];

  const groupedItems = allFilteredItems.reduce((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col">
        <div className="flex items-center p-4 border-b border-gray-200">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            className="flex-grow text-lg outline-none border-none focus:ring-0"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full">
            Esc
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-2">
          {Object.keys(groupedItems).length === 0 && searchTerm.trim() !== '' && (
            <p className="text-gray-500 text-center py-4">No results found for "{searchTerm}"</p>
          )}
          {Object.keys(groupedItems).map(group => (
            <div key={group} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 pt-4 pb-2">{group}</h3>
              <ul className="space-y-1">
                {groupedItems[group].map((item) => (
                  <li
                    key={item.id || item.name} // Use item.id if available, otherwise item.name
                    onClick={() => handleSelect(item)}
                    className="flex items-center px-4 py-2 rounded-md hover:bg-indigo-50 cursor-pointer text-gray-800 text-sm"
                  >
                    {item.icon && <item.icon className="mr-3 text-gray-500" size={18} />}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
