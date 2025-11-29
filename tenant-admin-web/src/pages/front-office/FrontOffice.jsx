import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { Search, UserPlus, Phone, Mail, Calendar, X, Edit2, Trash2, Clock, LogIn, LogOut, User, PhoneCall, MessageSquare } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';

// Sample data for enquiries
const initialEnquiries = {
  'new': [
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      className: 'Nursery', 
      phone: '+91 98765 43210', 
      email: 'rahul@example.com',
      source: 'Banner Ad',
      date: new Date(),
      notes: []
    },
    { 
      id: '2', 
      name: 'Priya Patel', 
      className: 'Class 1', 
      phone: '+91 87654 32109', 
      email: 'priya@example.com',
      source: 'Referral',
      date: new Date(),
      notes: []
    },
  ],
  'followup': [
    { 
      id: '3', 
      name: 'Amit Kumar', 
      className: 'Class 5', 
      phone: '+91 76543 21098', 
      email: 'amit@example.com',
      source: 'Website',
      date: new Date(),
      notes: [
        { date: new Date(), text: 'Interested in CBSE curriculum', user: 'Admin' },
        { date: new Date(), text: 'Asked about fee structure', user: 'Admin' }
      ]
    },
  ],
  'ready': [
    { 
      id: '4', 
      name: 'Neha Gupta', 
      className: 'Nursery', 
      phone: '+91 65432 10987', 
      email: 'neha@example.com',
      source: 'Walk-in',
      date: new Date(),
      notes: [
        { date: new Date(), text: 'Visited campus, liked facilities', user: 'Admin' },
        { date: new Date(), text: 'Requested prospectus', user: 'Admin' }
      ]
    },
  ],
  'closed': [
    { 
      id: '5', 
      name: 'Ravi Verma', 
      className: 'Class 3', 
      phone: '+91 54321 09876', 
      email: 'ravi@example.com',
      source: 'Referral',
      status: 'Admitted',
      date: new Date(),
      notes: [
        { date: new Date(), text: 'Admission confirmed', user: 'Admin' },
        { date: new Date(), text: 'Fee paid', user: 'Admin' }
      ]
    },
  ]
};

// Sample data for visitors
const initialVisitors = [
  {
    id: '1',
    name: 'Sanjay Mehta',
    phone: '+91 98765 12345',
    email: 'sanjay@example.com',
    purpose: 'Admission',
    personToMeet: 'Principal',
    timeIn: new Date('2023-11-28T10:30:00'),
    timeOut: new Date('2023-11-28T11:15:00'),
    notes: 'Interested in Class 1 admission',
  },
  {
    id: '2',
    name: 'Anjali Desai',
    phone: '+91 87654 32109',
    email: 'anjali@example.com',
    purpose: 'Meeting',
    personToMeet: 'Vice Principal',
    timeIn: new Date('2023-11-28T14:00:00'),
    timeOut: null,
    notes: 'PTA meeting regarding annual function',
  },
];

// Source options for enquiries
const sourceOptions = ['Banner Ad', 'Referral', 'Website', 'Walk-in', 'Social Media', 'Newspaper', 'Other'];

// Purpose options for visitors
const purposeOptions = ['Admission', 'Meeting', 'Interview', 'Delivery', 'Other'];

// People to meet options
const peopleOptions = ['Principal', 'Vice Principal', 'Headmaster', 'Office Staff', 'Teacher', 'Other'];

const FrontOffice = () => {
  const { terms } = useTerminology();
  const [activeTab, setActiveTab] = useState('enquiries');
  
  // Enquiry states
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  
  // Visitor states
  const [visitors, setVisitors] = useState(initialVisitors);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [visitorForm, setVisitorForm] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: '',
    personToMeet: '',
    notes: '',
  });
  
  // New Enquiry form state
  const [newEnquiry, setNewEnquiry] = useState({
    name: '',
    className: '',
    phone: '',
    email: '',
    source: '',
  });

  // Handle drag and drop for enquiry cards
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If dropped in the same place
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
    // Create a copy of the current state
    const newEnquiries = JSON.parse(JSON.stringify(enquiries));
    
    // Remove from source
    const [movedItem] = newEnquiries[source.droppableId].splice(source.index, 1);
    
    // Add to destination
    newEnquiries[destination.droppableId].splice(destination.index, 0, movedItem);
    
    // Update state
    setEnquiries(newEnquiries);
  };
  
  // Open enquiry details modal
  const openEnquiryDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNewNote('');
  };
  
  // Add a new note to an enquiry
  const addNote = () => {
    if (!newNote.trim()) return;
    
    const updatedEnquiries = JSON.parse(JSON.stringify(enquiries));
    let found = false;
    
    // Find and update the enquiry in the appropriate column
    Object.keys(updatedEnquiries).forEach(column => {
      const index = updatedEnquiries[column].findIndex(e => e.id === selectedEnquiry.id);
      if (index !== -1) {
        updatedEnquiries[column][index].notes.unshift({
          date: new Date(),
          text: newNote,
          user: 'Current User' // In a real app, this would be the logged-in user
        });
        setSelectedEnquiry(updatedEnquiries[column][index]);
        found = true;
      }
    });
    
    if (found) {
      setEnquiries(updatedEnquiries);
      setNewNote('');
    }
  };
  
  // Handle visitor form input changes
  const handleVisitorInputChange = (e) => {
    const { name, value } = e.target;
    setVisitorForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle new enquiry form input changes
  const handleEnquiryInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnquiry(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add a new visitor
  const addVisitor = (e) => {
    e.preventDefault();
    const newVisitor = {
      id: Date.now().toString(),
      ...visitorForm,
      timeIn: new Date(),
      timeOut: null
    };
    
    setVisitors([newVisitor, ...visitors]);
    setShowVisitorModal(false);
    setVisitorForm({
      name: '',
      phone: '',
      email: '',
      purpose: '',
      personToMeet: '',
      notes: '',
    });
  };
  
  // Add a new enquiry
  const addEnquiry = (e) => {
    e.preventDefault();
    const enquiry = {
      id: Date.now().toString(),
      ...newEnquiry,
      date: new Date(),
      notes: []
    };
    
    setEnquiries(prev => ({
      ...prev,
      new: [enquiry, ...prev.new]
    }));
    
    setNewEnquiry({
      name: '',
      className: '',
      phone: '',
      email: '',
      source: '',
    });
  };
  
  // Check out a visitor
  const checkOutVisitor = (visitorId) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === visitorId 
        ? { ...visitor, timeOut: new Date() } 
        : visitor
    ));
  };
  
  // Format time
  const formatTime = (date) => {
    if (!date) return '-';
    return format(date, 'h:mm a');
  };
  
  // Format date
  const formatDate = (date) => {
    if (!date) return '-';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Front Office</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage enquiries and visitor logs
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`${activeTab === 'enquiries' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Enquiries
          </button>
          <button
            onClick={() => setActiveTab('visitors')}
            className={`${activeTab === 'visitors' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <User className="h-4 w-4 mr-2" />
            Visitor Log
          </button>
        </nav>
      </div>
      
      {/* Enquiries Tab */}
      {activeTab === 'enquiries' && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Enquiry Management</h2>
            <button
              onClick={() => {
                setNewEnquiry({
                  name: '',
                  className: '',
                  phone: '',
                  email: '',
                  source: '',
                });
                setShowEnquiryModal(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              New Enquiry
            </button>
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* New Enquiries */}
              <Droppable droppableId="new">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">New Enquiry</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {enquiries.new.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {enquiries.new.map((enquiry, index) => (
                        <Draggable key={enquiry.id} draggableId={enquiry.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => openEnquiryDetails(enquiry)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{enquiry.name}</h4>
                                  <p className="text-sm text-gray-500">{enquiry.className}</p>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  {enquiry.source}
                                </span>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Phone className="h-3 w-3 mr-1" />
                                <span>{enquiry.phone}</span>
                              </div>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <Mail className="h-3 w-3 mr-1" />
                                <span className="truncate">{enquiry.email || 'No email'}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {enquiries.new.length === 0 && (
                        <div className="text-center text-sm text-gray-500 py-4">
                          No new enquiries
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              
              {/* Follow-up */}
              <Droppable droppableId="followup">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Follow-up</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {enquiries.followup.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {enquiries.followup.map((enquiry, index) => (
                        <Draggable key={enquiry.id} draggableId={enquiry.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => openEnquiryDetails(enquiry)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{enquiry.name}</h4>
                                  <p className="text-sm text-gray-500">{enquiry.className}</p>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  {enquiry.source}
                                </span>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  <span>{enquiry.phone}</span>
                                </div>
                                {enquiry.notes.length > 0 && (
                                  <div className="mt-1 text-xs text-gray-500 truncate">
                                    Last note: {enquiry.notes[0].text}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {enquiries.followup.length === 0 && (
                        <div className="text-center text-sm text-gray-500 py-4">
                          No follow-ups
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              
              {/* Ready for Admission */}
              <Droppable droppableId="ready">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Ready for Admission</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {enquiries.ready.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {enquiries.ready.map((enquiry, index) => (
                        <Draggable key={enquiry.id} draggableId={enquiry.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => openEnquiryDetails(enquiry)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{enquiry.name}</h4>
                                  <p className="text-sm text-gray-500">{enquiry.className}</p>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                  {enquiry.source}
                                </span>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  <span>{enquiry.phone}</span>
                                </div>
                                {enquiry.notes.length > 0 && (
                                  <div className="mt-1 text-xs text-gray-500 truncate">
                                    {enquiry.notes[0].text}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {enquiries.ready.length === 0 && (
                        <div className="text-center text-sm text-gray-500 py-4">
                          No ready enquiries
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              
              {/* Closed */}
              <Droppable droppableId="closed">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Closed</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {enquiries.closed.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {enquiries.closed.map((enquiry, index) => (
                        <Draggable key={enquiry.id} draggableId={enquiry.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => openEnquiryDetails(enquiry)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{enquiry.name}</h4>
                                  <p className="text-sm text-gray-500">{enquiry.className}</p>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  {enquiry.status || 'Closed'}
                                </span>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  <span>{enquiry.phone}</span>
                                </div>
                                {enquiry.notes.length > 0 && (
                                  <div className="mt-1 text-xs text-gray-500 truncate">
                                    {enquiry.notes[0].text}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {enquiries.closed.length === 0 && (
                        <div className="text-center text-sm text-gray-500 py-4">
                          No closed enquiries
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      )}
      
      {/* Visitor Log Tab */}
      {activeTab === 'visitors' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Visitor Log</h2>
            <button
              onClick={() => setShowVisitorModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Visitor
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visitor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meeting With
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time In / Out
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
                  {visitors.length > 0 ? (
                    visitors.map((visitor) => (
                      <tr key={visitor.id} className={!visitor.timeOut ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
                              <User className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                              <div className="text-sm text-gray-500">{visitor.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{visitor.purpose}</div>
                          {visitor.notes && (
                            <div className="text-xs text-gray-500 truncate max-w-xs">{visitor.notes}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {visitor.personToMeet}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <LogIn className="h-3.5 w-3.5 text-green-500 mr-1" />
                              {formatTime(visitor.timeIn)}
                            </div>
                            <div className="flex items-center mt-1">
                              <LogOut className="h-3.5 w-3.5 text-red-500 mr-1" />
                              {visitor.timeOut ? formatTime(visitor.timeOut) : 'Still here'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            !visitor.timeOut 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {!visitor.timeOut ? 'In Progress' : 'Completed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {!visitor.timeOut ? (
                            <button
                              onClick={() => checkOutVisitor(visitor.id)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Check Out
                            </button>
                          ) : (
                            <span className="text-gray-400">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No visitor records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Enquiry Details Modal */}
      {showEnquiryModal && !selectedEnquiry && (
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
                      New Enquiry
                    </h3>
                    <form onSubmit={addEnquiry}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Student Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newEnquiry.name}
                            onChange={handleEnquiryInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                            Class Interested In <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="className"
                            id="className"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newEnquiry.className}
                            onChange={handleEnquiryInputChange}
                            placeholder="e.g., Nursery, Class 1"
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newEnquiry.phone}
                            onChange={handleEnquiryInputChange}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newEnquiry.email}
                            onChange={handleEnquiryInputChange}
                            placeholder="example@email.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                            Source <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="source"
                            name="source"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newEnquiry.source}
                            onChange={handleEnquiryInputChange}
                          >
                            <option value="">Select source</option>
                            {sourceOptions.map((source) => (
                              <option key={source} value={source}>
                                {source}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        >
                          Save Enquiry
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setShowEnquiryModal(false)}
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
      
      {/* Enquiry Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedEnquiry.name}'s Enquiry
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setSelectedEnquiry(null)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Class Interested</p>
                          <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.className}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Source</p>
                          <p className="mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {selectedEnquiry.source}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Notes & Follow-ups</h4>
                        
                        <div className="space-y-4 mb-6">
                          {selectedEnquiry.notes.length > 0 ? (
                            selectedEnquiry.notes.map((note, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-md">
                                <div className="flex justify-between items-start">
                                  <p className="text-sm text-gray-700">{note.text}</p>
                                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                    {format(note.date, 'MMM d, h:mm a')}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">— {note.user}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">No notes added yet.</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="newNote" className="block text-sm font-medium text-gray-700 mb-1">
                            Add a note
                          </label>
                          <div className="flex
                          <div className="flex">
                            <input
                              type="text"
                              id="newNote"
                              className="flex-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Add a note about this enquiry..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addNote()}
                            />
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={addNote}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Visitor Modal */}
      {showVisitorModal && (
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
                      Add New Visitor
                    </h3>
                    <form onSubmit={addVisitor}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="visitorName" className="block text-sm font-medium text-gray-700">
                            Visitor Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="visitorName"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={visitorForm.name}
                            onChange={handleVisitorInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="visitorPhone" className="block text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="visitorPhone"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={visitorForm.phone}
                            onChange={handleVisitorInputChange}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="visitorEmail" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="visitorEmail"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={visitorForm.email}
                            onChange={handleVisitorInputChange}
                            placeholder="example@email.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                            Purpose of Visit <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="purpose"
                            name="purpose"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={visitorForm.purpose}
                            onChange={handleVisitorInputChange}
                          >
                            <option value="">Select purpose</option>
                            {purposeOptions.map((purpose) => (
                              <option key={purpose} value={purpose}>
                                {purpose}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="personToMeet" className="block text-sm font-medium text-gray-700">
                            Person to Meet <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="personToMeet"
                            name="personToMeet"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={visitorForm.personToMeet}
                            onChange={handleVisitorInputChange}
                          >
                            <option value="">Select person</option>
                            {peopleOptions.map((person) => (
                              <option key={person} value={person}>
                                {person}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows="3"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={visitorForm.notes}
                            onChange={handleVisitorInputChange}
                            placeholder="Any additional information..."
                          />
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        >
                          Check In
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setShowVisitorModal(false)}
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

export default FrontOffice;
