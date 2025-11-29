import { useState, useEffect } from 'react';
import { useTerminology } from '../../../contexts/TerminologyContext';
import { Plus, Edit, Trash2, Search, FileText, Printer, X, Check, Download } from 'lucide-react';

// Sample data - replace with actual API calls
const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C'];
const subjects = [
  { id: 1, name: 'Mathematics', hasPractical: true },
  { id: 2, name: 'Science', hasPractical: true },
  { id: 3, name: 'English', hasPractical: false },
  { id: 4, name: 'Hindi', hasPractical: false },
  { id: 5, name: 'Social Studies', hasPractical: false },
  { id: 6, name: 'Computer Science', hasPractical: true },
];

// Sample students data
const generateStudents = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    rollNo: (i + 1).toString().padStart(2, '0'),
    name: `Student ${i + 1}`,
    photo: `https://i.pravatar.cc/50?img=${i % 70}`, // Random avatars
  }));
};

// Sample exams data
const initialExams = [
  { id: 1, name: 'Mid-Term Exam', startDate: '2023-10-15', endDate: '2023-10-30', isActive: true },
  { id: 2, name: 'Weekly Test 1', startDate: '2023-09-01', endDate: '2023-09-01', isActive: true },
  { id: 3, name: 'Final Exam', startDate: '2024-03-01', endDate: '2024-03-15', isActive: false },
];

// Sample marks data structure
const initialMarks = {};

const ExamManager = () => {
  const { terms } = useTerminology();
  const [activeTab, setActiveTab] = useState('exams');
  const [exams, setExams] = useState(initialExams);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  
  // Form states
  const [newExam, setNewExam] = useState({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: ''
  });
  
  // Marks entry states
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState(initialMarks);
  const [students, setStudents] = useState([]);
  
  // Report card states
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  // Load sample students
  useEffect(() => {
    setStudents(generateStudents(25));
  }, []);
  
  // Filter students based on search
  useEffect(() => {
    if (studentSearch) {
      setFilteredStudents(
        students.filter(
          student =>
            student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
            student.rollNo.includes(studentSearch)
        )
      );
    } else {
      setFilteredStudents(students.slice(0, 10)); // Show first 10 by default
    }
  }, [studentSearch, students]);
  
  // Handle input changes for new exam form
  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Create a new exam
  const handleCreateExam = (e) => {
    e.preventDefault();
    const newExamObj = {
      id: Date.now(),
      name: newExam.name,
      startDate: newExam.startDate,
      endDate: newExam.endDate,
      isActive: true,
      description: newExam.description
    };
    
    setExams([...exams, newExamObj]);
    setNewExam({
      name: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: ''
    });
    setIsCreateExamModalOpen(false);
  };
  
  // Toggle exam active status
  const toggleExamStatus = (examId) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, isActive: !exam.isActive } : exam
    ));
  };
  
  // Confirm delete exam
  const confirmDeleteExam = (examId) => {
    setExamToDelete(examId);
    setIsDeleteConfirmOpen(true);
  };
  
  // Delete exam
  const deleteExam = () => {
    setExams(exams.filter(exam => exam.id !== examToDelete));
    setIsDeleteConfirmOpen(false);
    setExamToDelete(null);
  };
  
  // Handle marks input change
  const handleMarksChange = (studentId, field, value) => {
    // Ensure value is a number between 0 and max marks
    const numericValue = Math.min(Math.max(0, parseInt(value) || 0), field === 'theory' ? 80 : 20);
    
    setMarks(prev => ({
      ...prev,
      [selectedExam]: {
        ...prev[selectedExam],
        [selectedClass]: {
          ...prev[selectedExam]?.[selectedClass],
          [selectedSubject]: {
            ...prev[selectedExam]?.[selectedClass]?.[selectedSubject],
            [studentId]: {
              ...prev[selectedExam]?.[selectedClass]?.[selectedSubject]?.[studentId],
              [field]: numericValue
            }
          }
        }
      }
    }));
  };
  
  // Calculate total marks for a student
  const calculateTotal = (studentId) => {
    if (!selectedExam || !selectedClass || !selectedSubject) return 0;
    
    const studentMarks = marks[selectedExam]?.[selectedClass]?.[selectedSubject]?.[studentId] || {};
    const theory = studentMarks.theory || 0;
    const practical = studentMarks.practical || 0;
    
    return theory + practical;
  };
  
  // Calculate grade based on marks
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A1';
    if (percentage >= 80) return 'A2';
    if (percentage >= 70) return 'B1';
    if (percentage >= 60) return 'B2';
    if (percentage >= 50) return 'C1';
    if (percentage >= 40) return 'C2';
    if (percentage >= 33) return 'D';
    return 'E (Needs Improvement)';
  };
  
  // Generate sample report card data
  const generateReportCard = () => {
    if (!selectedStudent) return null;
    
    const student = students.find(s => s.id === parseInt(selectedStudent));
    if (!student) return null;
    
    // Sample data - in a real app, this would come from your API
    const reportData = {
      student: {
        ...student,
        class: selectedClass || '10',
        section: 'A',
        rollNo: student.rollNo,
        attendance: {
          present: 85,
          total: 100,
          percentage: 85
        }
      },
      exams: exams.filter(exam => exam.isActive).map(exam => ({
        ...exam,
        subjects: subjects.map(subject => ({
          ...subject,
          theoryMarks: Math.floor(Math.random() * 81), // 0-80
          practicalMarks: subject.hasPractical ? Math.floor(Math.random() * 21) : 0, // 0-20 if has practical
          maxTheory: 80,
          maxPractical: subject.hasPractical ? 20 : 0,
          maxMarks: subject.hasPractical ? 100 : 80
        })).map(subject => ({
          ...subject,
          totalMarks: subject.theoryMarks + subject.practicalMarks,
          percentage: Math.round(((subject.theoryMarks + subject.practicalMarks) / subject.maxMarks) * 100)
        })).map(subject => ({
          ...subject,
          grade: calculateGrade(subject.percentage)
        }))
      }))
    };
    
    return reportData;
  };
  
  const reportCardData = generateReportCard();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Exam Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage exams, enter marks, and generate report cards
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('exams')}
            className={`${activeTab === 'exams' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Exam Master
          </button>
          <button
            onClick={() => setActiveTab('marks')}
            className={`${activeTab === 'marks' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Marks Entry
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`${activeTab === 'reports' 
              ? 'border-indigo-500 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Report Cards
          </button>
        </nav>
      </div>

      {/* Exam Master Tab */}
      {activeTab === 'exams' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Exams</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create and manage examination schedules
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setIsCreateExamModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Exam
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Range
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
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                        <div className="text-sm text-gray-500">{exam.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${exam.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {exam.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleExamStatus(exam.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          {exam.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => confirmDeleteExam(exam.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No exams found. Create your first exam to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Marks Entry Tab */}
      {activeTab === 'marks' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Marks Entry</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter and manage student marks for exams
            </p>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="exam-select" className="block text-sm font-medium text-gray-700">
                  Select Exam
                </label>
                <select
                  id="exam-select"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                >
                  <option value="">Select Exam</option>
                  {exams.filter(exam => exam.isActive).map(exam => (
                    <option key={exam.id} value={exam.id}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="class-select" className="block text-sm font-medium text-gray-700">
                  {terms.class}
                </label>
                <select
                  id="class-select"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  disabled={!selectedExam}
                >
                  <option value="">Select {terms.class}</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>
                      {terms.class} {cls}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject-select"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={!selectedClass}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {selectedExam && selectedClass && selectedSubject ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Theory (80)
                    </th>
                    {subjects.find(s => s.id === parseInt(selectedSubject))?.hasPractical && (
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Practical (20)
                      </th>
                    )}
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total (100)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => {
                    const studentMarks = marks[selectedExam]?.[selectedClass]?.[selectedSubject]?.[student.id] || {};
                    const totalMarks = calculateTotal(student.id);
                    const maxMarks = subjects.find(s => s.id === parseInt(selectedSubject))?.hasPractical ? 100 : 80;
                    
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={student.photo} alt={student.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            max="80"
                            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center"
                            value={studentMarks.theory || ''}
                            onChange={(e) => handleMarksChange(student.id, 'theory', e.target.value)}
                            placeholder="0"
                          />
                        </td>
                        {subjects.find(s => s.id === parseInt(selectedSubject))?.hasPractical && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center"
                              value={studentMarks.practical || ''}
                              onChange={(e) => handleMarksChange(student.id, 'practical', e.target.value)}
                              placeholder="0"
                            />
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                            totalMarks >= maxMarks * 0.33 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {totalMarks} / {maxMarks}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={subjects.find(s => s.id === parseInt(selectedSubject))?.hasPractical ? 5 : 4} className="px-6 py-3 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Save Marks
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No selection</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please select an exam, class, and subject to enter marks.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Report Cards Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Report Cards</h3>
            <p className="mt-1 text-sm text-gray-500">
              Generate and print student report cards
            </p>
          </div>
          
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search by student name or roll number"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>
              
              {studentSearch ? (
                <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <li key={student.id}>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 flex items-center">
                            <div className="flex-shrink-0">
                              <img className="h-12 w-12 rounded-full" src={student.photo} alt={student.name} />
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="text-sm font-medium text-indigo-600 truncate">{student.name}</p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <span className="truncate">Roll No: {student.rollNo}</span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    Class: {selectedClass || 'Not selected'}
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <span className="truncate">Section: A</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setSelectedStudent(student.id);
                                setIsPrintPreviewOpen(true);
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <Printer className="h-3 w-3 mr-1" />
                              Print
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No student selected</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Search for a student to generate their report card.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Exam Modal */}
      {isCreateExamModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsCreateExamModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsCreateExamModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Create New Exam
                  </h3>
                </div>
              </div>
              
              <form onSubmit={handleCreateExam} className="mt-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Exam Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={newExam.name}
                      onChange={handleExamInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., Mid-Term, Final, Unit Test"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        required
                        value={newExam.startDate}
                        onChange={handleExamInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        required
                        min={newExam.startDate}
                        value={newExam.endDate}
                        onChange={handleExamInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="3"
                      value={newExam.description}
                      onChange={handleExamInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter any additional details about this exam"
                    />
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Create Exam
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreateExamModalOpen(false)}
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

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <X className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Exam
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this exam? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={deleteExam}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setIsDeleteConfirmOpen(false);
                    setExamToDelete(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Preview Modal */}
      {isPrintPreviewOpen && reportCardData && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsPrintPreviewOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => window.print()}
                  >
                    <Printer className="h-3 w-3 mr-1" />
                    Print
                  </button>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setIsPrintPreviewOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              {/* Report Card Content */}
              <div id="report-card" className="bg-white p-8 border border-gray-200">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">ABC PUBLIC SCHOOL</h1>
                  <p className="text-gray-600">123 Education Street, Knowledge City, 560001</p>
                  <p className="text-gray-600">Email: info@abcschool.edu.in | Phone: +91 80 1234 5678</p>
                  <h2 className="mt-4 text-xl font-semibold text-indigo-700">REPORT CARD</h2>
                  <p className="text-gray-600">Academic Year 2023-2024</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Student Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{reportCardData.student.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
                    <p className="mt-1 text-sm text-gray-900">{reportCardData.student.rollNo}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Class & Section</h3>
                    <p className="mt-1 text-sm text-gray-900">{terms.class} {reportCardData.student.class} - {reportCardData.student.section}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Attendance</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {reportCardData.student.attendance.present} / {reportCardData.student.attendance.total} days ({reportCardData.student.attendance.percentage}%)
                    </p>
                  </div>
                </div>
                
                {reportCardData.exams.map((exam) => (
                  <div key={exam.id} className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{exam.name} - {exam.subjects[0].totalMarks} Marks</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subject
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Theory
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Practical
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Percentage
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {exam.subjects.map((subject) => (
                            <tr key={subject.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {subject.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                {subject.theoryMarks} / {subject.maxTheory}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                {subject.hasPractical ? `${subject.practicalMarks} / ${subject.maxPractical}` : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                {subject.totalMarks} / {subject.maxMarks}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                {subject.percentage}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  subject.percentage >= 33 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {subject.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Class Teacher's Remarks</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {reportCardData.student.attendance.percentage > 75 ? 
                          'Good performance. Keep it up!' : 
                          'Needs improvement in some subjects. Please pay more attention to studies.'
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-block mt-8">
                        <div className="border-t-2 border-gray-400 w-32 mt-2"></div>
                        <p className="text-sm text-gray-500">Principal's Signature</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center text-xs text-gray-500">
                  <p>This is a computer-generated report card. No signature is required.</p>
                  <p className="mt-1">Generated on: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setIsPrintPreviewOpen(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManager;
