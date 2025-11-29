import React, { useState } from 'react';
import { Download, Printer, Truck, Clock, CheckCircle } from 'lucide-react';

const StoreOrders = () => {
  // Sample data - in a real app, this would come from an API
  const [orders, setOrders] = useState([
    {
      id: 1,
      schoolName: 'Global Public School',
      item: '500 Notebooks',
      fileName: 'school_logo.png',
      status: 'pending',
      orderDate: '2025-11-28'
    },
    {
      id: 2,
      schoolName: 'Sunshine International',
      item: '200 T-Shirts',
      fileName: 'sunshine_logo.jpg',
      status: 'in_printing',
      orderDate: '2025-11-27'
    },
    {
      id: 3,
      schoolName: 'City Central School',
      item: '1000 Pens',
      fileName: 'city_central_logo.png',
      status: 'dispatched',
      orderDate: '2025-11-25'
    },
  ]);

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4" />, label: 'Pending' },
      in_printing: { color: 'bg-blue-100 text-blue-800', icon: <Printer className="h-4 w-4" />, label: 'In Printing' },
      dispatched: { color: 'bg-green-100 text-green-800', icon: <Truck className="h-4 w-4" />, label: 'Dispatched' },
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: null, label: status };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getNextStatus = (currentStatus) => {
    const statusOrder = ['pending', 'in_printing', 'dispatched'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[currentIndex + 1] || null;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Store Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all store orders from schools
          </p>
        </div>
      </div>
      
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      School Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Item
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Custom File
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => {
                    const nextStatus = getNextStatus(order.status);
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {order.schoolName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.item}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a 
                            href={`#download-${order.id}`} 
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.preventDefault();
                              // In a real app, this would trigger a file download
                              alert(`Downloading ${order.fileName}`);
                            }}
                          >
                            <Download className="h-4 w-4 mr-1.5" />
                            {order.fileName}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {nextStatus ? (
                            <button
                              onClick={() => updateStatus(order.id, nextStatus)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Mark as {nextStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </button>
                          ) : (
                            <span className="text-gray-400">
                              <CheckCircle className="h-5 w-5 inline mr-1" />
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrders;
