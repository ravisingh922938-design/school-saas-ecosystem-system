import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { BookOpen, BookCheck, BookX, Search, ArrowRight, ArrowLeft, Clock, AlertTriangle } from 'lucide-react';

// Sample data - replace with actual API calls
const sampleBooks = [
  { id: 1, title: 'Introduction to React', author: 'John Doe', isbn: '978-1234567890', quantity: 5, available: 3 },
  { id: 2, title: 'Advanced JavaScript', author: 'Jane Smith', isbn: '978-0987654321', quantity: 3, available: 0 },
  { id: 3, title: 'CSS Mastery', author: 'Alice Johnson', isbn: '978-1122334455', quantity: 7, available: 2 },
  { id: 4, title: 'Node.js in Action', author: 'Mike Wilson', isbn: '978-5544332211', quantity: 4, available: 4 },
  { id: 5, title: 'Python Programming', author: 'Sarah Williams', isbn: '978-6677889900', quantity: 6, available: 1 },
];

const sampleIssuedBooks = [
  { 
    id: 1, 
    bookId: 1, 
    bookTitle: 'Introduction to React', 
    studentId: 'S1001', 
    studentName: 'Rahul Sharma',
    issueDate: '2023-10-15',
    dueDate: '2023-10-30',
    returnDate: null,
    status: 'issued'
  },
  { 
    id: 2, 
    bookId: 3, 
    bookTitle: 'CSS Mastery', 
    studentId: 'S1002', 
    studentName: 'Priya Patel',
    issueDate: '2023-10-10',
    dueDate: '2023-10-25',
    returnDate: null,
    status: 'overdue'
  },
];

const Library = () => {
  const { terms } = useTerminology();
  
  // State
  const [activeTab, setActiveTab] = useState('catalog');
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [issueForm, setIssueForm] = useState({
    studentId: '',
    bookId: ''
  });
  const [returnForm, setReturnForm] = useState({
    studentId: '',
    bookId: ''
  });
  
  // Load sample data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBooks(sampleBooks);
      setIssuedBooks(sampleIssuedBooks);
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );
  
  // Handle issue book
  const handleIssueBook = async (e) => {
    e.preventDefault();
    if (!issueForm.studentId || !issueForm.bookId) {
      alert('Please enter both Student ID and Book ID');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate the student and book availability here
      const book = books.find(b => b.isbn === issueForm.bookId || b.id.toString() === issueForm.bookId);
      
      if (!book) {
        throw new Error('Book not found');
      }
      
      if (book.available <= 0) {
        throw new Error('Book is out of stock');
      }
      
      // Update books (decrease available count)
      setBooks(prevBooks => 
        prevBooks.map(b => 
          b.id === book.id ? { ...b, available: b.available - 1 } : b
        )
      );
      
      // Add to issued books
      const newIssuedBook = {
        id: Date.now(),
        bookId: book.id,
        bookTitle: book.title,
        studentId: issueForm.studentId,
        studentName: `Student ${issueForm.studentId}`, // In real app, fetch from API
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
        returnDate: null,
        status: 'issued'
      };
      
      setIssuedBooks(prev => [...prev, newIssuedBook]);
      
      // Reset form
      setIssueForm({ studentId: '', bookId: '' });
      
      alert(`Book "${book.title}" issued successfully!`);
    } catch (error) {
      console.error('Error issuing book:', error);
      alert(`Failed to issue book: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle return book
  const handleReturnBook = async (e) => {
    e.preventDefault();
    if (!returnForm.studentId || !returnForm.bookId) {
      alert('Please enter both Student ID and Book ID');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const book = books.find(b => b.isbn === returnForm.bookId || b.id.toString() === returnForm.bookId);
      const issuedBook = issuedBooks.find(
        ib => ib.bookId === book?.id && 
        ib.studentId === returnForm.studentId && 
        !ib.returnDate
      );
      
      if (!issuedBook) {
        throw new Error('No active issue record found for this book and student');
      }
      
      // Update issued books (mark as returned)
      setIssuedBooks(prev => 
        prev.map(ib => 
          ib.id === issuedBook.id 
            ? { ...ib, returnDate: new Date().toISOString().split('T')[0] } 
            : ib
        )
      );
      
      // Update books (increase available count)
      setBooks(prevBooks => 
        prevBooks.map(b => 
          b.id === book.id ? { ...b, available: b.available + 1 } : b
        )
      );
      
      // Reset form
      setReturnForm({ studentId: '', bookId: '' });
      
      alert(`Book "${book.title}" returned successfully!`);
    } catch (error) {
      console.error('Error returning book:', error);
      alert(`Failed to return book: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Check if a book is overdue
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !returnForm.returnDate;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Library Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage books, track issues, and handle returns
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`${activeTab === 'catalog' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Book Catalog
          </button>
          <button
            onClick={() => setActiveTab('issue')}
            className={`${activeTab === 'issue' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <BookCheck className="h-4 w-4 mr-2" />
            Issue/Return
          </button>
        </nav>
      </div>

      {/* Book Catalog Tab */}
      {activeTab === 'catalog' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Book Catalog</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Browse and manage the library collection
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="Search by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ISBN
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{book.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.isbn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.available} of {book.quantity} available
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {book.available > 0 ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No books found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Issue/Return Tab */}
      {activeTab === 'issue' && (
        <div className="space-y-6">
          {/* Issue Book Card */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Issue Book</h3>
              <p className="mt-1 text-sm text-gray-500">
                Issue a book to a student
              </p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleIssueBook} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label htmlFor="issue-student-id" className="block text-sm font-medium text-gray-700">
                      Student ID / Roll No
                    </label>
                    <input
                      type="text"
                      id="issue-student-id"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={issueForm.studentId}
                      onChange={(e) => setIssueForm({...issueForm, studentId: e.target.value})}
                      placeholder="e.g., S1001"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="issue-book-id" className="block text-sm font-medium text-gray-700">
                      Book ISBN / Barcode
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="issue-book-id"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={issueForm.bookId}
                        onChange={(e) => setIssueForm({...issueForm, bookId: e.target.value})}
                        placeholder="Scan or enter ISBN"
                        required
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 flex items-end">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Issue Book
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Return Book Card */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Return Book</h3>
              <p className="mt-1 text-sm text-gray-500">
                Process a book return
              </p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleReturnBook} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label htmlFor="return-student-id" className="block text-sm font-medium text-gray-700">
                      Student ID / Roll No
                    </label>
                    <input
                      type="text"
                      id="return-student-id"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={returnForm.studentId}
                      onChange={(e) => setReturnForm({...returnForm, studentId: e.target.value})}
                      placeholder="e.g., S1001"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="return-book-id" className="block text-sm font-medium text-gray-700">
                      Book ISBN / Barcode
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="return-book-id"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={returnForm.bookId}
                        onChange={(e) => setReturnForm({...returnForm, bookId: e.target.value})}
                        placeholder="Scan or enter ISBN"
                        required
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 flex items-end">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Return Book
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Currently Issued Books */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Currently Issued Books</h3>
              <p className="mt-1 text-sm text-gray-500">
                List of books currently issued to students
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issued On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issuedBooks.length > 0 ? (
                    issuedBooks
                      .filter(book => !book.returnDate) // Only show active issues
                      .map((book) => (
                        <tr 
                          key={book.id} 
                          className={`${isOverdue(book.dueDate) ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-md">
                                <BookOpen className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{book.bookTitle}</div>
                                <div className="text-sm text-gray-500">ID: {book.bookId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{book.studentName}</div>
                            <div className="text-sm text-gray-500">{book.studentId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(book.issueDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${isOverdue(book.dueDate) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                              {formatDate(book.dueDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isOverdue(book.dueDate) ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                <AlertTriangle className="h-3 w-3 mr-1 mt-0.5" />
                                Overdue
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                <Clock className="h-3 w-3 mr-1 mt-0.5" />
                                Due Soon
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No books are currently issued.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {issuedBooks.some(book => isOverdue(book.dueDate) && !book.returnDate) && (
              <div className="bg-red-50 border-t border-red-200 px-4 py-3 sm:px-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {issuedBooks.filter(book => isOverdue(book.dueDate) && !book.returnDate).length} overdue book(s)
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>Please follow up with the students to return the overdue books.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
