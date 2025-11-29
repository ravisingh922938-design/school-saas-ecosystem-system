import { useState } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { Search, Filter, User, Mail, Phone, Eye, Edit, X, Download, Printer } from 'lucide-react';
import QRCode from 'qrcode.react';

// Sample data - replace with actual data from your API
const sampleStudents = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rollNo: '2023001',
    class: '10',
    section: 'A',
    parentPhone: '+91 98765 43210',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=random',
  },
  {
    id: 2,
    name: 'Priya Patel',
    rollNo: '2023002',
    class: '9',
    section: 'B',
    parentPhone: '+91 98765 43211',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Priya+Patel&background=random',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    rollNo: '2023003',
    class: '8',
    section: 'A',
    parentPhone: '+91 98765 43212',
    status: 'Inactive',
    photo: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=random',
  },
];

const StudentManager = () => {
  const { terms } = useTerminology();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Filter students based on search and class filter
  const filteredStudents = sampleStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.includes(searchQuery);
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Toggle student selection for ID cards
  const toggleStudentSelection = (id) => {
    setSelectedStudents(prev => 
      prev.includes(id) 
        ? prev.filter(studentId => studentId !== id)
        : [...prev, id]
    );
  };

  // Get selected students data
  const selectedStudentsData = sampleStudents.filter(student => 
    selectedStudents.includes(student.id)
  );

  // Generate ID cards for selected students
  const generateIdCards = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }
    setShowIdCardModal(true);
  };

  // Print ID cards
  const printIdCards = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage {terms.student}s</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${terms.student}s...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All {terms.class}es</option>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((cls) => (
                <option key={cls} value={cls}>
                  {terms.class} {cls}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={generateIdCards}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <User className="mr-2 h-4 w-4" />
            Generate ID Cards
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents(filteredStudents.map(student => student.id));
                      } else {
                        setSelectedStudents([]);
                      }
                    }}
                    checked={selectedStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {terms.student} Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {terms.class}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent Contact
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
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleStudentSelection(student.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={student.photo} alt={student.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Roll: {student.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{terms.class} {student.class} {student.section}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="h-4 w-4 text-gray-500 mr-1" />
                      {student.parentPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ID Card Modal */}
      {showIdCardModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowIdCardModal(false)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Generate ID Cards
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedStudents.length} {terms.student}(s) selected
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={printIdCards}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Printer className="h-4 w-4 mr-1" /> Print
                    </button>
                    <button
                      onClick={() => setShowIdCardModal(false)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Download className="h-4 w-4 mr-1" /> Download All
                    </button>
                    <button
                      onClick={() => setShowIdCardModal(false)}
                      className="ml-2 bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedStudentsData.map((student) => (
                    <div key={student.id} className="id-card-print bg-white border border-gray-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
                      <div className="relative">
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            {terms.class} {student.class}{student.section}
                          </span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          {/* School Logo */}
                          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                            <span className="text-xl font-bold text-indigo-600">SS</span>
                          </div>
                          
                          {/* Student Photo */}
                          <div className="w-24 h-24 border-4 border-white rounded-full shadow-md overflow-hidden mb-3">
                            <img 
                              src={student.photo} 
                              alt={student.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Student Info */}
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                            <p className="text-xs text-gray-500 mt-1">SchoolSaaS Academy</p>
                          </div>
                          
                          {/* QR Code */}
                          <div className="p-2 bg-white border border-gray-200 rounded">
                            <QRCode 
                              value={`${student.name}|${student.rollNo}|${terms.class} ${student.class}${student.section}`}
                              size={80}
                              level="H"
                              includeMargin={true}
                            />
                          </div>
                          
                          {/* Footer */}
                          <div className="mt-3 w-full border-t border-gray-200 pt-2">
                            <p className="text-xs text-center text-gray-500">
                              Valid until: 31/12/2025
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={printIdCards}
                >
                  Print ID Cards
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowIdCardModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .id-card-print, .id-card-print * {
            visibility: visible;
          }
          .id-card-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            page-break-after: always;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentManager;
