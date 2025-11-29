import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { UserPlus, User, Phone, Mail, Calendar, DollarSign, FileText, Download, X, Check, XCircle } from 'lucide-react';

// Sample data - replace with actual API calls
const staffMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.k@example.com',
    phone: '+91 98765 43210',
    role: 'teacher',
    joiningDate: '2022-01-15',
    baseSalary: 45000,
    status: 'active',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+91 98765 43211',
    role: 'teacher',
    joiningDate: '2021-06-22',
    baseSalary: 52000,
    status: 'active',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'amit.p@example.com',
    phone: '+91 98765 43212',
    role: 'accountant',
    joiningDate: '2023-03-10',
    baseSalary: 38000,
    status: 'active',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 4,
    name: 'Suresh Reddy',
    email: 'suresh.r@example.com',
    phone: '+91 98765 43213',
    role: 'driver',
    joiningDate: '2022-11-05',
    baseSalary: 25000,
    status: 'inactive',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: 5,
    name: 'Meena Iyer',
    email: 'meena.i@example.com',
    phone: '+91 98765 43214',
    role: 'teacher',
    joiningDate: '2023-01-18',
    baseSalary: 48000,
    status: 'active',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg'
  }
];

// Sample attendance data - in a real app, this would come from an API
const getAttendanceData = (staffId, month, year) => {
  // This is mock data - replace with actual API call
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const presentDays = Math.floor(Math.random() * (daysInMonth - 20) + 20); // Random present days between 20 and daysInMonth
  return {
    presentDays,
    absentDays: daysInMonth - presentDays,
    leaves: Math.floor(Math.random() * 3), // 0-2 leaves
    lateArrivals: Math.floor(Math.random() * 5) // 0-4 late arrivals
  };
};

const StaffManager = () => {
  const { terms } = useTerminology();
  const [activeTab, setActiveTab] = useState('directory');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isSalarySlipModalOpen, setIsSalarySlipModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  // Form state for adding new staff
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'teacher',
    joiningDate: new Date().toISOString().split('T')[0],
    baseSalary: 0,
    status: 'active'
  });

  // Get current month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter staff based on search term and role
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || staff.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Handle input changes for new staff form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewStaff(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission for adding new staff
  const handleAddStaff = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    console.log('Adding new staff:', newStaff);
    // Reset form and close modal
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'teacher',
      joiningDate: new Date().toISOString().split('T')[0],
      baseSalary: 0,
      status: 'active'
    });
    setIsAddStaffModalOpen(false);
  };

  // Generate salary slip for a staff member
  const generateSalarySlip = (staff) => {
    setSelectedStaff({
      ...staff,
      ...getAttendanceData(staff.id, selectedMonth, selectedYear)
    });
    setIsSalarySlipModalOpen(true);
  };

  // Calculate salary details
  const calculateSalaryDetails = (staff) => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const perDaySalary = staff.baseSalary / daysInMonth;
    const attendance = getAttendanceData(staff.id, selectedMonth, selectedYear);
    
    // Calculate deductions for late arrivals (100 per late arrival)
    const lateArrivalDeduction = attendance.lateArrivals * 100;
    
    // Calculate net salary
    const netSalary = Math.max(0, 
      staff.baseSalary - 
      (perDaySalary * attendance.absentDays) - 
      lateArrivalDeduction
    );
    
    return {
      ...attendance,
      perDaySalary: Math.round(perDaySalary),
      lateArrivalDeduction,
      netSalary: Math.round(netSalary),
      totalDeductions: Math.round((perDaySalary * attendance.absentDays) + lateArrivalDeduction)
    };
  };

  // Get role display name
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'teacher':
        return terms.teacher;
      case 'accountant':
        return 'Accountant';
      case 'driver':
        return 'Driver';
      default:
        return role;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        {activeTab === 'directory' && (
          <button
            onClick={() => setIsAddStaffModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('directory')}
            className={`${activeTab === 'directory' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Staff Directory
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`${activeTab === 'payroll' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Payroll
          </button>
        </nav>
      </div>

      {/* Staff Directory Tab */}
      {activeTab === 'directory' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-medium text-gray-900">Staff Directory</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage all staff members at your institution
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Roles</option>
                    <option value="teacher">{terms.teacher}</option>
                    <option value="accountant">Accountant</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or phone"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={staff.photo} alt={staff.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                            <div className="text-sm text-gray-500">{staff.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getRoleDisplayName(staff.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {staff.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.status === 'active' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No staff members found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payroll Tab */}
      {activeTab === 'payroll' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Salary Processing</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Process and manage staff salaries for the selected period
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {monthNames.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="ml-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present Days
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Salary (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Salary (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffMembers.filter(staff => staff.status === 'active').map((staff) => {
                  const salaryDetails = calculateSalaryDetails(staff);
                  
                  return (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={staff.photo} alt={staff.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                            <div className="text-sm text-gray-500">{getRoleDisplayName(staff.role)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getRoleDisplayName(staff.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          {salaryDetails.presentDays} days
                        </div>
                        <div className="text-xs text-gray-400">
                          {salaryDetails.absentDays} absent, {salaryDetails.leaves} leave(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{staff.baseSalary.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        -₹{salaryDetails.totalDeductions.toLocaleString('en-IN')}
                        {salaryDetails.lateArrivals > 0 && (
                          <div className="text-xs text-gray-400">
                            ({salaryDetails.lateArrivals} late arrivals)
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{salaryDetails.netSalary.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => generateSalarySlip({ ...staff, ...salaryDetails })}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Generate Slip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {isAddStaffModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsAddStaffModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsAddStaffModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Staff Member
                  </h3>
                </div>
              </div>
              
              <form onSubmit={handleAddStaff} className="mt-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={newStaff.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={newStaff.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={newStaff.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={newStaff.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="teacher">{terms.teacher}</option>
                        <option value="accountant">Accountant</option>
                        <option value="driver">Driver</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
                        Joining Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="joiningDate"
                        id="joiningDate"
                        required
                        value={newStaff.joiningDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">
                      Base Salary (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="baseSalary"
                      id="baseSalary"
                      required
                      min="0"
                      step="100"
                      value={newStaff.baseSalary}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g. 35000"
                    />
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddStaffModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Salary Slip Modal */}
      {isSalarySlipModalOpen && selectedStaff && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsSalarySlipModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsSalarySlipModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Salary Slip Content */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">ABC Public School</h2>
                    <p className="text-gray-600">123 Education Street, Knowledge City, 560001</p>
                    <p className="text-gray-600">Email: info@abcschool.edu.in | Phone: +91 80 1234 5678</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-xl font-bold text-indigo-700">SALARY SLIP</h1>
                    <p className="text-gray-600">
                      {monthNames[selectedMonth]} {selectedYear}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Generated on: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* Employee Details */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Employee Details</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Name:</div>
                        <div className="font-medium">{selectedStaff.name}</div>
                        
                        <div className="text-gray-500">Employee ID:</div>
                        <div>EMP{String(selectedStaff.id).padStart(3, '0')}</div>
                        
                        <div className="text-gray-500">Designation:</div>
                        <div>{getRoleDisplayName(selectedStaff.role)}</div>
                        
                        <div className="text-gray-500">Joining Date:</div>
                        <div>{new Date(selectedStaff.joiningDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Salary Details</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Pay Period:</div>
                        <div>1st - {new Date(selectedYear, selectedMonth + 1, 0).getDate()} {monthNames[selectedMonth]} {selectedYear}</div>
                        
                        <div className="text-gray-500">Payment Mode:</div>
                        <div>Bank Transfer</div>
                        
                        <div className="text-gray-500">Bank Name:</div>
                        <div>State Bank of India</div>
                        
                        <div className="text-gray-500">Account No:</div>
                        <div>•••• •••• {String(selectedStaff.id).padStart(4, '0')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Earnings & Deductions */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Earnings */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Earnings</h3>
                      <div className="border border-gray-200 rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Basic Salary
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                ₹{selectedStaff.baseSalary.toLocaleString('en-IN')}
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Total Earnings
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                                ₹{selectedStaff.baseSalary.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Deductions */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Deductions</h3>
                      <div className="border border-gray-200 rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Absent Days ({selectedStaff.absentDays} days)
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 text-right">
                                -₹{(selectedStaff.perDaySalary * selectedStaff.absentDays).toLocaleString('en-IN')}
                              </td>
                            </tr>
                            {selectedStaff.lateArrivals > 0 && (
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  Late Arrivals ({selectedStaff.lateArrivals} @ ₹100 each)
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 text-right">
                                  -₹{(selectedStaff.lateArrivals * 100).toLocaleString('en-IN')}
                                </td>
                              </tr>
                            )}
                            <tr className="bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Total Deductions
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-red-600 text-right">
                                -₹{selectedStaff.totalDeductions.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="border-t border-b border-gray-200 py-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-900">Net Payable</div>
                    <div className="text-2xl font-bold text-indigo-700">
                      ₹{selectedStaff.netSalary.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    In words: {numberToWords(selectedStaff.netSalary)} Rupees Only
                  </div>
                </div>
                
                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>This is a system generated document.</p>
                    <p className="mt-1">No signature required.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">For ABC Public School</p>
                    <p className="mt-6 text-sm text-gray-500">
                      Authorized Signatory
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download/Print
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setIsSalarySlipModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to convert number to words
function numberToWords(num) {
  const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  
  const convertTens = (num) => {
    if (num < 10) return single[num];
    if (num < 20) return double[num - 10];
    const ten = Math.floor(num / 10);
    const rest = num % 10;
    return tens[ten] + (rest ? ' ' + single[rest] : '');
  };
  
  const convertHundreds = (num) => {
    if (num > 99) {
      return single[Math.floor(num / 100)] + ' Hundred ' + convertTens(num % 100);
    }
    return convertTens(num);
  };
  
  const convert = (num) => {
    if (num < 100) return convertTens(num);
    if (num < 1000) return convertHundreds(num);
    
    const thousands = Math.floor(num / 1000);
    const rest = num % 1000;
    return convert(thousands) + ' Thousand' + (rest ? ' ' + convertHundreds(rest) : '');
  };
  
  return convert(num);
}

export default StaffManager;
