import { useState } from 'react';
import { Bus, Phone, ChevronDown, ChevronUp, MapPin, IndianRupee } from 'lucide-react';

// Sample data - replace with actual API calls
const routes = [
  {
    id: 1,
    name: 'City Loop A',
    driver: 'Rajesh Kumar',
    vehicleNo: 'KA01AB1234',
    totalStudents: 24,
    stops: [
      { id: 1, name: 'MG Road', time: '07:00 AM', fee: 1500 },
      { id: 2, name: 'Indiranagar', time: '07:20 AM', fee: 1200 },
      { id: 3, name: 'Koramangala', time: '07:40 AM', fee: 1000 },
    ],
    totalFee: 3700
  },
  {
    id: 2,
    name: 'Suburb Line',
    driver: 'Vikram Singh',
    vehicleNo: 'KA01CD5678',
    totalStudents: 18,
    stops: [
      { id: 1, name: 'Whitefield', time: '07:15 AM', fee: 1800 },
      { id: 2, name: 'Marathahalli', time: '07:35 AM', fee: 1500 },
    ],
    totalFee: 3300
  },
  {
    id: 3,
    name: 'Downtown Express',
    driver: 'Arjun Patel',
    vehicleNo: 'KA01EF9012',
    totalStudents: 30,
    stops: [
      { id: 1, name: 'Jayanagar', time: '07:00 AM', fee: 1200 },
      { id: 2, name: 'JP Nagar', time: '07:15 AM', fee: 1000 },
      { id: 3, name: 'Banashankari', time: '07:30 AM', fee: 800 },
      { id: 4, name: 'Uttarahalli', time: '07:45 AM', fee: 600 },
    ],
    totalFee: 3600
  },
];

const vehicles = [
  { id: 1, regNo: 'KA01AB1234', driver: 'Rajesh Kumar', phone: '+91 98765 43210', capacity: 35 },
  { id: 2, regNo: 'KA01CD5678', driver: 'Vikram Singh', phone: '+91 98765 43211', capacity: 28 },
  { id: 3, regNo: 'KA01EF9012', driver: 'Arjun Patel', phone: '+91 98765 43212', capacity: 42 },
  { id: 4, regNo: 'KA01GH3456', driver: 'Suresh Reddy', phone: '+91 98765 43213', capacity: 30 },
];

const Transport = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [expandedRoute, setExpandedRoute] = useState(null);

  const toggleRoute = (routeId) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transport Management</h1>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('routes')}
            className={`${activeTab === 'routes' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Routes
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`${activeTab === 'vehicles' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Vehicles
          </button>
        </nav>
      </div>

      {/* Routes Tab */}
      {activeTab === 'routes' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle No.
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.map((route) => (
                <>
                  <tr 
                    key={route.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRoute(route.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{route.name}</div>
                          <div className="text-sm text-gray-500">{route.stops.length} stops</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{route.driver}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {route.vehicleNo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className="text-gray-900">{route.totalStudents}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {expandedRoute === route.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </td>
                  </tr>
                  {expandedRoute === route.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="px-6 py-4">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              Stops on {route.name}
                            </h3>
                            <div className="text-sm text-gray-500">
                              Total Fee: <span className="font-semibold">₹{formatCurrency(route.totalFee)}</span>
                            </div>
                          </div>
                          <div className="border-t border-gray-200">
                            <dl>
                              {route.stops.map((stop, index) => (
                                <div 
                                  key={stop.id} 
                                  className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                  }`}
                                >
                                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                                    {stop.name}
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                    {stop.time}
                                  </dd>
                                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 text-right">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      <IndianRupee className="h-3 w-3 mr-1" />
                                      {formatCurrency(stop.fee)}/month
                                    </span>
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{routes.length}</span> of{' '}
                  <span className="font-medium">{routes.length}</span> routes
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Tab */}
      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <Bus className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Vehicle No.
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {vehicle.regNo}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {vehicle.capacity} Seats
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Driver</span>
                    <span className="font-medium text-gray-900">{vehicle.driver}</span>
                  </div>
                  <div className="mt-2">
                    <a
                      href={`tel:${vehicle.phone}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Phone className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                      Call Driver
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add New Vehicle Card */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-8">
            <div className="text-center">
              <Bus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Add new vehicle</h3>
              <p className="mt-1 text-sm text-gray-500">
                Register a new vehicle to your fleet
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transport;
