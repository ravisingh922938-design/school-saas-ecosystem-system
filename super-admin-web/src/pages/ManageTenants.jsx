import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown, Search, MoreHorizontal, SearchX, Ban, Trash2, Key } from 'lucide-react'; // Added Key icon
import { Link, useNavigate } from 'react-router-dom';
import { useImpersonation } from '../context/ImpersonationContext';
import EmptyState from '../components/EmptyState'; // New import
import { fetchTenants, toggleTenantStatus, deleteTenant } from '../services/api'; // Import API functions

const ManageTenants = () => { // Renamed from TenantsTable
  const [tenants, setTenants] = useState([]); // Changed to empty array, will fetch from API
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [openDropdownId, setOpenDropdownId] = useState(null); // State for open dropdown

  const navigate = useNavigate();
  const { startImpersonation } = useImpersonation();

  useEffect(() => {
    const getTenants = async () => {
      try {
        setLoading(true);
        const response = await fetchTenants();
        setTenants(response.data);
      } catch (err) {
        console.error("Error fetching tenants:", err);
        setError("Failed to load tenants.");
      } finally {
        setLoading(false);
      }
    };
    getTenants();
  }, []);

  useEffect(() => {
    const handleImpersonate = async (tenant) => {
      try {
        const response = await fetch(`/api/tenants/${tenant._id}/impersonate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to impersonate');
        }

        // Start impersonation using the context
        startImpersonation(tenant);
        
        // Save the impersonation token
        localStorage.setItem('impersonateToken', data.token);
        
        // Redirect to school dashboard
        navigate('/school-dashboard');
        
      } catch (error) {
        console.error('Impersonation failed:', error);
        // You might want to show a toast notification here
      }
    };
  }, [navigate, startImpersonation]);

  // Filtered tenants logic
  const filteredTenants = useMemo(() => {
    let filtered = tenants;

    if (filterType !== 'All') {
      filtered = filtered.filter((tenant) => tenant.type === filterType);
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter((tenant) => tenant.status === filterStatus);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (tenant) =>
          tenant.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          tenant.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          tenant._id.toString().includes(lowerCaseSearchTerm) // Assuming ID can be searched
      );
    }
    return filtered;
  }, [tenants, searchTerm, filterType, filterStatus]);

  // Sorting Logic
  const sortTenants = () => {
    const sorted = [...filteredTenants].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.studentCount - b.studentCount;
      } else {
        return b.studentCount - a.studentCount;
      }
    });
    // When sorting, apply it to the filtered results, but also update the base tenants state
    // to ensure subsequent filters work correctly on the sorted data.
    setTenants(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterType('All');
    setFilterStatus('All');
    setTenants(tenants); // Reset to original unsorted/unfiltered list
  };

  const areFiltersActive = searchTerm !== '' || filterType !== 'All' || filterStatus !== 'All';

  const handleLoginAsAdmin = (tenant) => {
    startImpersonation(tenant);
    navigate('/school-dashboard'); // Redirect to dummy school dashboard
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    setOpenDropdownId(null);
    const originalTenants = [...tenants];
    
    // Optimistic UI update
    setTenants(prevTenants =>
      prevTenants.map(tenant =>
        tenant._id === id ? { ...tenant, status: currentStatus === 'Active' ? 'Blocked' : 'Active' } : tenant
      )
    );

    try {
      await toggleTenantStatus(id);
      // If API call is successful, state is already updated optimistically
    } catch (err) {
      console.error("Error toggling tenant status:", err);
      alert("Failed to toggle tenant status. Please try again.");
      setTenants(originalTenants); // Revert optimistic update on error
    }
  };

  const handleDeleteTenant = async (id, name) => {
    setOpenDropdownId(null);
    if (window.confirm(`Are you sure you want to delete tenant "${name}"? This action cannot be undone.`)) {
      const originalTenants = [...tenants];
      // Optimistic UI update: remove tenant from list
      setTenants(prevTenants => prevTenants.filter(tenant => tenant._id !== id));

      try {
        await deleteTenant(id);
        alert(`Tenant "${name}" deleted successfully!`); // Replace with Toast later
      } catch (err) {
        console.error("Error deleting tenant:", err);
        alert("Failed to delete tenant. Please try again.");
        setTenants(originalTenants); // Revert optimistic update on error
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 dark:text-gray-100">Loading tenants...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Tenant Directory</h2>
        <Link to="/tenants/add" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
          + Add New Tenant
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search by Name, Email, or ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3 justify-end items-center">
          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="School">School</option>
            <option value="Coaching">Coaching</option>
            <option value="College">College</option>
          </select>

          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>

          {areFiltersActive && (
            <button
              onClick={handleResetFilters}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {filteredTenants.length === 0 ? (
        <EmptyState
          title="No Tenants Found"
          description="It looks like there are no tenants matching your current filters. Try adjusting your search or adding a new tenant."
          buttonText={areFiltersActive ? "Clear Filters" : "Add New Tenant"}
          onButtonClick={areFiltersActive ? handleResetFilters : () => navigate('/tenants/add')}
          icon={SearchX}
        />
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-100 dark:border-slate-700 dark:text-gray-300">
              <th className="py-3 font-medium">Tenant Name</th>
              {/* SPECIAL EMPHASIS ON STUDENTS COLUMN */}
              <th
                className="py-3 font-medium cursor-pointer hover:text-indigo-600 flex items-center gap-2 dark:hover:text-indigo-400"
                onClick={sortTenants}
              >
                TOTAL STUDENTS <ArrowUpDown size={14} />
              </th>
              <th className="py-3 font-medium hidden md:table-cell">Type</th> {/* Hidden on small screens */}
              <th className="py-3 font-medium hidden md:table-cell">Revenue Model</th> {/* Hidden on small screens */}
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant._id} className="border-b border-gray-50 hover:bg-gray-50 transition dark:border-slate-700 dark:hover:bg-slate-700">
                <td className="py-4 flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${tenant.name.split(' ').join('+')}&background=random`} 
                    alt="logo" 
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-100">{tenant.name}</span>
                </td>
                
                {/* HIGHLIGHTED METRIC UI */}
                <td className="py-4">
                  <span className="text-blue-600 font-extrabold text-lg">
                    {tenant.studentCount.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 ml-1 dark:text-gray-300">Students</span>
                </td>

                <td className="py-4 hidden md:table-cell">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${tenant.type === 'School' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                    {tenant.type}
                  </span>
                </td>
                <td className="py-4 text-gray-600 text-sm hidden md:table-cell dark:text-gray-300">{tenant.revenueModel}</td>
                <td className="py-4">
                  <span className={`w-2 h-2 inline-block rounded-full mr-2 ${tenant.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="dark:text-gray-100">{tenant.status}</span>
                </td>
                <td className="py-4 relative">
                  <button onClick={() => toggleDropdown(tenant._id)} className="text-gray-400 hover:text-gray-600 focus:outline-none dark:text-gray-300 dark:hover:text-gray-100">
                    <MoreHorizontal size={20} />
                  </button>
                  {openDropdownId === tenant._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 dark:bg-slate-700 dark:border dark:border-slate-600">
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const handleImpersonate = async (tenant) => {
                              try {
                                const response = await fetch(`/api/tenants/${tenant._id}/impersonate`, {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                  }
                                });

                                const data = await response.json();

                                if (!response.ok) {
                                  throw new Error(data.message || 'Failed to impersonate');
                                }

                                // Start impersonation using the context
                                startImpersonation(tenant);
                                
                                // Save the impersonation token
                                localStorage.setItem('impersonateToken', data.token);
                                
                                // Redirect to school dashboard
                                navigate('/school-dashboard');
                                
                              } catch (error) {
                                console.error('Impersonation failed:', error);
                                // You might want to show a toast notification here
                              }
                            };
                            handleImpersonate(tenant);
                          }}
                          className="text-gray-500 hover:text-blue-600"
                          title="Impersonate this tenant"
                        >
                          <Key className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === tenant._id ? null : tenant._id);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          handleLoginAsAdmin(tenant);
                          setOpenDropdownId(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-600"
                      >
                        Login as Admin
                      </button>
                      <button
                        onClick={() => handleToggleStatus(tenant._id, tenant.status)}
                        className={`block w-full text-left px-4 py-2 text-sm ${tenant.status === 'Active' ? 'text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900' : 'text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-900'}`}
                      >
                        {tenant.status === 'Active' ? 'Block Tenant' : 'Activate Tenant'}
                      </button>
                      <button
                        onClick={() => handleDeleteTenant(tenant._id, tenant.name)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900"
                      >
                        Delete Tenant
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageTenants; // Renamed from TenantsTable
