import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { Search, AlertCircle, Clock, CheckCircle2, XCircle, CreditCard, IndianRupee } from 'lucide-react';

// Sample data - replace with actual API calls
const sampleStudents = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rollNo: '2023001',
    class: '10',
    section: 'A',
    photo: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=random',
    pendingDues: 12500,
    lastPayments: [
      { id: 1, amount: 2500, date: '2023-11-15', status: 'success', mode: 'UPI' },
      { id: 2, amount: 2000, date: '2023-10-15', status: 'success', mode: 'Cash' },
      { id: 3, amount: 1500, date: '2023-09-15', status: 'failed', mode: 'UPI' },
    ]
  },
  // Add more sample students as needed
];

const FeeCollection = () => {
  const { terms } = useTerminology();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Filter students based on search query
  const filteredStudents = searchQuery
    ? sampleStudents.filter(
        student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNo.includes(searchQuery)
      )
    : [];

  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setRecentTransactions(student.lastPayments);
    setPaymentAmount('');
    setSearchQuery('');
  };

  // Handle payment submission
  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedStudent || !paymentAmount) return;

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to process the payment
      const newTransaction = {
        id: Date.now(),
        amount: Number(paymentAmount),
        date: new Date().toISOString().split('T')[0],
        status: 'success',
        mode: paymentMode
      };
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      setPaymentAmount('');
      setIsProcessing(false);
      
      // Show success message
      alert(`Payment of ₹${paymentAmount} collected successfully via ${paymentMode === 'cash' ? 'Cash' : 'Online/UPI'}`);
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Fee Collection</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Student Search */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h2>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Student Name or Roll No"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Search Results Dropdown */}
            {searchQuery && filteredStudents.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
                    onClick={() => handleSelectStudent(student)}
                  >
                    <div className="flex items-center">
                      <img src={student.photo} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                      <span className="ml-3 block font-normal truncate">
                        {student.name} (Roll: {student.rollNo}) - {terms.class} {student.class}{student.section}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Student Card */}
          {selectedStudent ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  className="h-16 w-16 rounded-full"
                  src={selectedStudent.photo}
                  alt={selectedStudent.name}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-500">
                    {terms.class} {selectedStudent.class}{selectedStudent.section} • Roll: {selectedStudent.rollNo}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-800">Total Pending Due</p>
                <p className="text-2xl font-bold text-red-600">₹ {formatCurrency(selectedStudent.pendingDues)}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Fee Structure</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition Fee</span>
                    <span className="font-medium">₹ 8,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transport Fee</span>
                    <span className="font-medium">₹ 2,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Other Charges</span>
                    <span className="font-medium">₹ 2,000</span>
                  </div>
                  <div className="border-t border-gray-200 my-1"></div>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total Dues</span>
                    <span>₹ {formatCurrency(selectedStudent.pendingDues)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No student selected</h3>
              <p className="mt-1 text-sm text-gray-500">Search and select a student to collect fees</p>
            </div>
          )}
        </div>
        
        {/* Right Side - Payment Terminal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Payment Terminal</h2>
          
          {selectedStudent ? (
            <>
              <form onSubmit={handlePayment}>
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Paying Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      min="1"
                      max={selectedStudent?.pendingDues || ''}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="text-gray-500 sm:text-sm pr-3">INR</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Maximum: ₹{formatCurrency(selectedStudent.pendingDues)}
                  </p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        paymentMode === 'cash'
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setPaymentMode('cash')}
                    >
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        Cash
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        paymentMode === 'online'
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setPaymentMode('online')}
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Online/UPI
                      </div>
                    </button>
                  </div>
                  
                  {paymentMode === 'online' && (
                    <p className="mt-2 text-sm text-yellow-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Note: ₹25 Platform Fee applies
                    </p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount to Pay</span>
                      <span>₹{paymentAmount ? formatCurrency(Number(paymentAmount)) : '0'}</span>
                    </div>
                    {paymentMode === 'online' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Platform Fee</span>
                        <span>₹25.00</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="flex justify-between font-medium">
                      <span>Total Payable</span>
                      <span>
                        ₹{paymentAmount ? formatCurrency(Number(paymentAmount) + (paymentMode === 'online' ? 25 : 0)) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!paymentAmount || isProcessing}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    !paymentAmount || isProcessing
                      ? 'bg-green-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Collect Fee'}
                </button>
              </form>
              
              {/* Recent Transactions */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Last 5 Transactions</h3>
                {recentTransactions.length > 0 ? (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {recentTransactions.map((transaction) => (
                        <li key={transaction.id}>
                          <div className="px-4 py-3 flex items-center">
                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              transaction.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.status === 'success' ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-600" />
                              )}
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{formatCurrency(transaction.amount)}
                                </p>
                                <div className="text-sm text-gray-500">
                                  {new Date(transaction.date).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500 capitalize">
                                  {transaction.mode}
                                </p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  transaction.status === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {transaction.status === 'success' ? 'Success' : 'Failed'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Clock className="mx-auto h-8 w-8 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No recent transactions</h3>
                    <p className="mt-1 text-sm text-gray-500">Payment history will appear here</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No student selected</h3>
              <p className="mt-1 text-sm text-gray-500">Select a student to process payment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeCollection;
