import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { Search, Plus, Package, Truck, FileText, Upload, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

// Sample data - replace with actual API calls
const initialItems = [
  { 
    id: '1', 
    name: 'Wooden Chair', 
    category: 'Furniture', 
    quantity: 25, 
    location: 'Classroom 101', 
    condition: 'Good',
    minStock: 5,
    supplierId: 's1',
    unit: 'pcs',
    lastUpdated: '2023-11-20'
  },
  { 
    id: '2', 
    name: 'Projector', 
    category: 'Electronics', 
    quantity: 3, 
    location: 'Computer Lab', 
    condition: 'Good',
    minStock: 2,
    supplierId: 's2',
    unit: 'pcs',
    lastUpdated: '2023-11-15'
  },
  { 
    id: '3', 
    name: 'A4 Paper (Ream)', 
    category: 'Stationery', 
    quantity: 4, 
    location: 'Store Room', 
    condition: 'Good',
    minStock: 10,
    supplierId: 's3',
    unit: 'reams',
    lastUpdated: '2023-11-25'
  },
  { 
    id: '4', 
    name: 'Basketball', 
    category: 'Sports', 
    quantity: 8, 
    location: 'Sports Room', 
    condition: 'Damaged',
    minStock: 5,
    supplierId: 's4',
    unit: 'pcs',
    lastUpdated: '2023-11-10'
  },
  { 
    id: '5', 
    name: 'Whiteboard Marker', 
    category: 'Stationery', 
    quantity: 42, 
    location: 'Staff Room', 
    condition: 'Good',
    minStock: 20,
    supplierId: 's3',
    unit: 'pcs',
    lastUpdated: '2023-11-28'
  },
];

const initialSuppliers = [
  { id: 's1', name: 'Furniture World', contact: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@furnitureworld.com', address: '123 Market St, City' },
  { id: 's2', name: 'Tech Gadgets Inc', contact: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@techgadgets.com', address: '456 Tech Park, City' },
  { id: 's3', name: 'Stationery Plus', contact: 'Amit Patel', phone: '+91 76543 21098', email: 'amit@stationeryplus.com', address: '789 Station Rd, City' },
  { id: 's4', name: 'Sports Gear Ltd', contact: 'Neha Gupta', phone: '+91 65432 10987', email: 'neha@sportsgear.com', address: '321 Stadium Rd, City' },
];

const categories = ['All', 'Furniture', 'Electronics', 'Stationery', 'Sports'];
const conditions = ['All', 'Good', 'Damaged'];

const InventoryManager = () => {
  const { terms } = useTerminology();
  const [activeTab, setActiveTab] = useState('stocks');
  
  // Stocks tab states
  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  
  // Suppliers tab states
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: ''
  });
  
  // Purchase tab states
  const [purchaseForm, setPurchaseForm] = useState({
    supplierId: '',
    itemId: '',
    quantity: '',
    unitPrice: '',
    totalCost: '',
    billNumber: '',
    billDate: new Date().toISOString().split('T')[0],
    billFile: null,
    notes: ''
  });
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  
  // Filter items based on search, category, and condition
  useEffect(() => {
    let result = [...items];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.location.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply condition filter
    if (selectedCondition !== 'All') {
      result = result.filter(item => item.condition === selectedCondition);
    }
    
    setFilteredItems(result);
  }, [searchTerm, selectedCategory, selectedCondition, items]);
  
  // Handle supplier form input changes
  const handleSupplierInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle purchase form input changes
  const handlePurchaseInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setPurchaseForm(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      // Calculate total cost when quantity or unit price changes
      if ((name === 'quantity' || name === 'unitPrice') && purchaseForm.quantity && purchaseForm.unitPrice) {
        const quantity = name === 'quantity' ? parseInt(value) || 0 : parseInt(purchaseForm.quantity) || 0;
        const unitPrice = name === 'unitPrice' ? parseFloat(value) || 0 : parseFloat(purchaseForm.unitPrice) || 0;
        
        setPurchaseForm(prev => ({
          ...prev,
          [name]: value,
          totalCost: (quantity * unitPrice).toFixed(2)
        }));
      } else {
        setPurchaseForm(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };
  
  // Handle item selection in purchase form
  const handleItemSelect = (itemId) => {
    const selectedItem = items.find(item => item.id === itemId);
    if (selectedItem) {
      const supplier = suppliers.find(s => s.id === selectedItem.supplierId);
      
      setPurchaseForm(prev => ({
        ...prev,
        itemId,
        supplierId: selectedItem.supplierId,
        unit: selectedItem.unit,
        // Reset quantity and unit price when item changes
        quantity: '',
        unitPrice: '',
        totalCost: ''
      }));
      
      // You might want to set a default unit price based on the item or supplier
    }
  };
  
  // Save supplier (add new or update existing)
  const saveSupplier = (e) => {
    e.preventDefault();
    
    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier => 
        supplier.id === editingSupplier.id 
          ? { ...supplier, ...supplierForm }
          : supplier
      ));
    } else {
      // Add new supplier
      const newSupplier = {
        id: `s${Date.now()}`,
        ...supplierForm
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    
    // Reset form and close modal
    setSupplierForm({
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: ''
    });
    setEditingSupplier(null);
    setShowSupplierForm(false);
  };
  
  // Edit supplier
  const editSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      contact: supplier.contact,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address
    });
    setShowSupplierForm(true);
  };
  
  // Delete supplier
  const deleteSupplier = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    }
  };
  
  // Handle purchase submission
  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    
    // Update item quantity
    const updatedItems = items.map(item => {
      if (item.id === purchaseForm.itemId) {
        return {
          ...item,
          quantity: item.quantity + parseInt(purchaseForm.quantity),
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    
    // In a real app, you would also save the purchase record to your database here
    
    // Update state
    setItems(updatedItems);
    
    // Reset form
    setPurchaseForm({
      supplierId: '',
      itemId: '',
      quantity: '',
      unitPrice: '',
      totalCost: '',
      billNumber: '',
      billDate: new Date().toISOString().split('T')[0],
      billFile: null,
      notes: ''
    });
    
    // Show success message
    alert('Purchase recorded successfully!');
    setShowPurchaseForm(false);
  };
  
  // Get items by supplier for the purchase form dropdown
  const getItemsBySupplier = (supplierId) => {
    return items.filter(item => item.supplierId === supplierId);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Manager</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage school assets, suppliers, and purchases
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`${activeTab === 'stocks' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Package className="h-4 w-4 mr-2" />
            Stocks
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`${activeTab === 'suppliers' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Truck className="h-4 w-4 mr-2" />
            Suppliers
          </button>
          <button
            onClick={() => setActiveTab('purchase')}
            className={`${activeTab === 'purchase' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Purchase
          </button>
        </nav>
      </div>
      
      {/* Stocks Tab */}
      {activeTab === 'stocks' && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Inventory Items</h2>
            <button
              onClick={() => {
                // In a real app, this would open a form to add a new item
                alert('Add new item functionality would go here');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 md:mt-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </button>
          </div>
          
          {/* Filters */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Items
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  id="condition"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedCondition('All');
                  }}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Items Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">ID: {item.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                          <div className="text-xs text-gray-500">Min: {item.minStock} {item.unit}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.condition === 'Good' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.lastUpdated)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.quantity <= item.minStock ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              In Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No items found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Suppliers</h2>
            <button
              onClick={() => {
                setEditingSupplier(null);
                setSupplierForm({
                  name: '',
                  contact: '',
                  phone: '',
                  email: '',
                  address: ''
                });
                setShowSupplierForm(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 md:mt-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </button>
          </div>
          
          {/* Suppliers Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Person
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {suppliers.length > 0 ? (
                    suppliers.map((supplier) => (
                      <tr key={supplier.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-xs text-gray-500">ID: {supplier.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {supplier.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{supplier.phone}</div>
                          <div className="text-xs text-gray-500">{supplier.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {supplier.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => editSupplier(supplier)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteSupplier(supplier.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No suppliers found. Add your first supplier to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Purchase Tab */}
      {activeTab === 'purchase' && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Record New Purchase</h2>
            <button
              onClick={() => setShowPurchaseForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 md:mt-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Purchase
            </button>
          </div>
          
          {/* Purchase Form Modal */}
          {showPurchaseForm && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Record New Purchase
                          </h3>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPurchaseForm(false)}
                          >
                            <X className="h-6 w-6" />
                          </button>
                        </div>
                        
                        <form onSubmit={handlePurchaseSubmit} className="mt-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700">
                                Supplier <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="supplierId"
                                name="supplierId"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={purchaseForm.supplierId}
                                onChange={handlePurchaseInputChange}
                              >
                                <option value="">Select a supplier</option>
                                {suppliers.map(supplier => (
                                  <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="col-span-2">
                              <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                                Item <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="itemId"
                                name="itemId"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={purchaseForm.itemId}
                                onChange={(e) => {
                                  handlePurchaseInputChange(e);
                                  handleItemSelect(e.target.value);
                                }}
                                disabled={!purchaseForm.supplierId}
                              >
                                <option value="">Select an item</option>
                                {purchaseForm.supplierId && getItemsBySupplier(purchaseForm.supplierId).map(item => (
                                  <option key={item.id} value={item.id}>
                                    {item.name} ({item.category})
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Quantity <span className="text-red-500">*</span>
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  type="number"
                                  name="quantity"
                                  id="quantity"
                                  min="1"
                                  required
                                  className="block w-full pr-12 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="0"
                                  value={purchaseForm.quantity}
                                  onChange={handlePurchaseInputChange}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <span className="text-gray-500 text-sm">
                                    {purchaseForm.unit || 'pcs'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                                Unit Price (₹) <span className="text-red-500">*</span>
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">₹</span>
                                </div>
                                <input
                                  type="number"
                                  name="unitPrice"
                                  id="unitPrice"
                                  min="0"
                                  step="0.01"
                                  required
                                  className="block w-full pl-7 pr-12 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="0.00"
                                  value={purchaseForm.unitPrice}
                                  onChange={handlePurchaseInputChange}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">
                                Total Cost (₹)
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">₹</span>
                                </div>
                                <input
                                  type="text"
                                  id="totalCost"
                                  readOnly
                                  className="block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  value={purchaseForm.totalCost || '0.00'}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="billNumber" className="block text-sm font-medium text-gray-700">
                                Bill Number
                              </label>
                              <input
                                type="text"
                                name="billNumber"
                                id="billNumber"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={purchaseForm.billNumber}
                                onChange={handlePurchaseInputChange}
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="billDate" className="block text-sm font-medium text-gray-700">
                                Bill Date
                              </label>
                              <input
                                type="date"
                                name="billDate"
                                id="billDate"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={purchaseForm.billDate}
                                onChange={handlePurchaseInputChange}
                              />
                            </div>
                            
                            <div className="col-span-2">
                              <label htmlFor="billFile" className="block text-sm font-medium text-gray-700">
                                Upload Bill (PDF/Image)
                              </label>
                              <div className="mt-1 flex items-center">
                                <input
                                  type="file"
                                  name="billFile"
                                  id="billFile"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                  onChange={handlePurchaseInputChange}
                                />
                              </div>
                            </div>
                            
                            <div className="col-span-2">
                              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                Notes
                              </label>
                              <textarea
                                id="notes"
                                name="notes"
                                rows="3"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={purchaseForm.notes}
                                onChange={handlePurchaseInputChange}
                                placeholder="Any additional information about this purchase..."
                              />
                            </div>
                          </div>
                          
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button
                              type="submit"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                            >
                              Record Purchase
                            </button>
                            <button
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                              onClick={() => setShowPurchaseForm(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Recent Purchases Table */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Purchases</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supplier
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bill
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No recent purchases found. Record a new purchase to see it here.
                      </td>
                    </tr>
                    {/* In a real app, you would map through recent purchases here */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Supplier Form Modal */}
      {showSupplierForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                    </h3>
                    <form onSubmit={saveSupplier} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Supplier Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={supplierForm.name}
                          onChange={handleSupplierInputChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                          Contact Person <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={supplierForm.contact}
                          onChange={handleSupplierInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={supplierForm.phone}
                            onChange={handleSupplierInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={supplierForm.email}
                            onChange={handleSupplierInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={supplierForm.address}
                          onChange={handleSupplierInputChange}
                        />
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        >
                          {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setShowSupplierForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManager;
