import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { CheckCircle2, XCircle, Clock, Send, Save } from 'lucide-react';

// Sample data - replace with actual API calls
const generateStudents = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    rollNo: (i + 1).toString().padStart(2, '0'),
    name: `Student ${i + 1}`,
    status: 'present', // 'present', 'absent', 'late'
    photo: `https://i.pravatar.cc/100?img=${i % 70}`, // Random avatars
  }));
};

const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const AttendanceRegister = () => {
  const { terms } = useTerminology();
  
  // State
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0
  });

  // Load sample data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = generateStudents(40);
      setStudents(data);
      updateStats(data);
      setIsLoading(false);
    };
    
    if (selectedClass) {
      loadData();
    }
  }, [selectedClass]);
  
  // Update stats when students array changes
  const updateStats = (studentsList) => {
    const present = studentsList.filter(s => s.status === 'present').length;
    const late = studentsList.filter(s => s.status === 'late').length;
    const absent = studentsList.filter(s => s.status === 'absent').length;
    
    setStats({
      total: studentsList.length,
      present,
      absent,
      late
    });
  };
  
  // Handle student status change
  const handleStatusChange = (studentId) => {
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.map(student => {
        if (student.id === studentId) {
          // Cycle through statuses: present -> absent -> late -> present
          let newStatus = 'present';
          if (student.status === 'present') newStatus = 'absent';
          else if (student.status === 'absent') newStatus = 'late';
          
          return { ...student, status: newStatus };
        }
        return student;
      });
      
      updateStats(updatedStudents);
      return updatedStudents;
    });
  };
  
  // Handle save attendance
  const handleSaveAttendance = async (sendSMS = false) => {
    setIsSaving(true);
    
    try {
      // Simulate API call to save attendance
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (sendSMS) {
        // Simulate sending SMS to absentees
        const absentStudents = students.filter(s => s.status === 'absent');
        console.log(`Sending SMS to ${absentStudents.length} absent students`);
      }
      
      // Show success message or redirect
      alert(`Attendance saved successfully${sendSMS ? ' and SMS sent to absentees' : ''}!`);
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Failed to save attendance. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Get status styles
  const getStatusStyles = (status) => {
    switch (status) {
      case 'present':
        return 'border-green-500 bg-green-50';
      case 'absent':
        return 'border-red-500 bg-red-50';
      case 'late':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Register</h1>
          <p className="mt-1 text-sm text-gray-500">
            Mark and manage daily attendance for {terms.students}
          </p>
        </div>
      </div>
      
      {/* Header with filters */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                {terms.class}
              </label>
              <select
                id="class"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select {terms.class}</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>
                    {terms.class} {cls}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!selectedClass || isLoading}
              >
                {isLoading ? 'Loading...' : 'Load Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      {selectedClass && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Total Strength</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Present</p>
            <p className="text-2xl font-semibold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Absent</p>
            <p className="text-2xl font-semibold text-red-600">{stats.absent}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Late/Leave</p>
            <p className="text-2xl font-semibold text-yellow-600">{stats.late}</p>
          </div>
        </div>
      )}
      
      {/* Student Grid */}
      {selectedClass ? (
        isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${getStatusStyles(student.status)}`}
                  onClick={() => handleStatusChange(student.id)}
                >
                  <div className="absolute top-2 right-2">
                    {getStatusIcon(student.status)}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <img
                      className="h-16 w-16 rounded-full mb-2 object-cover"
                      src={student.photo}
                      alt={student.name}
                    />
                    <h3 className="text-sm font-medium text-gray-900">{student.name}</h3>
                    <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-6 shadow-lg">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleSaveAttendance()}
                  disabled={isSaving}
                >
                  <Save className="h-5 w-5 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Attendance'}
                </button>
                
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => handleSaveAttendance(true)}
                  disabled={isSaving || stats.absent === 0}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSaving ? 'Saving...' : 'Save & Notify Absentees'}
                </button>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Select a class to begin</h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose a {terms.class} from the dropdown above to load the attendance register.
          </p>
        </div>
      )}
      
      {/* Help Text */}
      <div className="mt-8 text-sm text-gray-500">
        <p className="font-medium">Quick Guide:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Click on a student card to mark as absent (red)</li>
          <li>Click again to mark as late/leave (yellow)</li>
          <li>Click once more to mark as present (green)</li>
          <li>Use the buttons below to save attendance or notify absentees</li>
        </ul>
      </div>
    </div>
  );
};

export default AttendanceRegister;
