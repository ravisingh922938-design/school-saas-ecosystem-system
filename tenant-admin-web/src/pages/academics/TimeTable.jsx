import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { X, Clock, BookOpen, User, AlertCircle } from 'lucide-react';

// Sample data - replace with actual API calls
const subjects = [
  { id: 1, name: 'Mathematics', color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Science', color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'English', color: 'bg-yellow-100 text-yellow-800' },
  { id: 4, name: 'Social Studies', color: 'bg-purple-100 text-purple-800' },
  { id: 5, name: 'Hindi', color: 'bg-red-100 text-red-800' },
  { id: 6, name: 'Computer Science', color: 'bg-indigo-100 text-indigo-800' },
  { id: 7, name: 'Physical Education', color: 'bg-pink-100 text-pink-800' },
];

const teachers = [
  { id: 1, name: 'Mr. Sharma', subjectId: 1 },
  { id: 2, name: 'Ms. Patel', subjectId: 2 },
  { id: 3, name: 'Mr. Kumar', subjectId: 3 },
  { id: 4, name: 'Ms. Gupta', subjectId: 4 },
  { id: 5, name: 'Mr. Singh', subjectId: 5 },
  { id: 6, name: 'Ms. Reddy', subjectId: 6 },
  { id: 7, name: 'Mr. Iyer', subjectId: 7 },
];

const timeSlots = [
  { id: 1, start: '08:00', end: '08:45' },
  { id: 2, start: '08:45', end: '09:30' },
  { id: 3, start: '09:30', end: '10:15' },
  { id: 4, start: '10:15', end: '11:00' },
  { id: 5, start: '11:15', end: '12:00' }, // Break after this
  { id: 6, start: '12:00', end: '12:45' },
  { id: 7, start: '12:45', end: '13:30' },
  { id: 8, start: '13:30', end: '14:15' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Sample timetable data structure
const initialTimetable = {};
timeSlots.forEach(slot => {
  initialTimetable[slot.id] = {};
  days.forEach(day => {
    initialTimetable[slot.id][day] = null; // Will store { subjectId, teacherId }
  });
});

// Add some sample data for demonstration
initialTimetable[1]['Monday'] = { subjectId: 1, teacherId: 1 }; // Math with Mr. Sharma
initialTimetable[2]['Monday'] = { subjectId: 2, teacherId: 2 }; // Science with Ms. Patel

const TimeTable = () => {
  const { terms } = useTerminology();
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [timetable, setTimetable] = useState(initialTimetable);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [teacherConflicts, setTeacherConflicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter teachers based on selected subject
  const filteredTeachers = selectedSubject
    ? teachers.filter(teacher => teacher.subjectId === parseInt(selectedSubject))
    : [];

  // Check for teacher conflicts when teacher is selected
  useEffect(() => {
    if (selectedTeacher && selectedCell) {
      const conflicts = [];
      const teacherId = parseInt(selectedTeacher);
      const { day, timeSlotId } = selectedCell;
      
      // Check if teacher is already assigned to another class at the same time
      Object.entries(timetable[timeSlotId]).forEach(([currentDay, slot]) => {
        if (slot && slot.teacherId === teacherId && currentDay !== day) {
          conflicts.push({
            day: currentDay,
            time: `${timeSlots.find(ts => ts.id === timeSlotId).start} - ${timeSlots.find(ts => ts.id === timeSlotId).end}`,
            subject: subjects.find(s => s.id === slot.subjectId)?.name || 'Unknown',
            class: selectedClass,
            section: selectedSection
          });
        }
      });
      
      setTeacherConflicts(conflicts);
    } else {
      setTeacherConflicts([]);
    }
  }, [selectedTeacher, selectedCell, timetable, selectedClass, selectedSection]);

  const handleCellClick = (timeSlotId, day) => {
    setSelectedCell({ timeSlotId, day });
    const slot = timetable[timeSlotId][day];
    setSelectedSubject(slot?.subjectId?.toString() || '');
    setSelectedTeacher(slot?.teacherId?.toString() || '');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedSubject || !selectedTeacher || !selectedCell) return;

    const { timeSlotId, day } = selectedCell;
    
    setTimetable(prev => ({
      ...prev,
      [timeSlotId]: {
        ...prev[timeSlotId],
        [day]: {
          subjectId: parseInt(selectedSubject),
          teacherId: parseInt(selectedTeacher)
        }
      }
    }));
    
    setIsModalOpen(false);
  };

  const handleClearSlot = () => {
    if (!selectedCell) return;
    
    const { timeSlotId, day } = selectedCell;
    
    setTimetable(prev => ({
      ...prev,
      [timeSlotId]: {
        ...prev[timeSlotId],
        [day]: null
      }
    }));
    
    setIsModalOpen(false);
  };

  const getSubjectById = (id) => subjects.find(subject => subject.id === id);
  const getTeacherById = (id) => teachers.find(teacher => teacher.id === id);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Class Timetable</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
              {terms.class}
            </label>
            <select
              id="class"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {terms.class} {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-48">
            <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
              {terms.section}
            </label>
            <select
              id="section"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {['A', 'B', 'C', 'D'].map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-32">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      Time
                    </div>
                  </th>
                  {days.map((day) => (
                    <th 
                      key={day} 
                      scope="col" 
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot.id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 w-32">
                      <div className="flex flex-col">
                        <span className="font-medium">{timeSlot.start} - {timeSlot.end}</span>
                        <span className="text-xs text-gray-400">{timeSlot.id === 5 ? 'Break' : 'Period ' + timeSlot.id}</span>
                      </div>
                    </td>
                    {days.map((day) => {
                      const slot = timetable[timeSlot.id][day];
                      const subject = slot ? getSubjectById(slot.subjectId) : null;
                      const teacher = slot ? getTeacherById(slot.teacherId) : null;
                      
                      return (
                        <td 
                          key={`${timeSlot.id}-${day}`}
                          className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleCellClick(timeSlot.id, day)}
                        >
                          {slot ? (
                            <div className={`p-2 rounded-md ${subject?.color} border-l-4 ${subject?.color.replace('bg-', 'border-')}`}>
                              <div className="font-medium">{subject?.name || 'Subject'}</div>
                              <div className="text-xs mt-1 flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {teacher?.name || 'Teacher'}
                              </div>
                            </div>
                          ) : (
                            <div className="h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                              <span className="text-xs">Click to add</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Subject & Teacher Modal */}
      {isModalOpen && selectedCell && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {selectedCell && `Assign ${terms.class} ${selectedClass}${selectedSection} - ${selectedCell.day}`}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {timeSlots.find(ts => ts.id === selectedCell?.timeSlotId)?.start} - {timeSlots.find(ts => ts.id === selectedCell?.timeSlotId)?.end}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={selectedSubject}
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        setSelectedTeacher('');
                      }}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
                      Teacher
                    </label>
                    <select
                      id="teacher"
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                        teacherConflicts.length > 0 ? 'border-red-300 bg-red-50' : ''
                      }`}
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      disabled={!selectedSubject}
                    >
                      <option value="">Select a teacher</option>
                      {filteredTeachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                    
                    {teacherConflicts.length > 0 && (
                      <div className="mt-2 text-sm text-red-600 flex items-start">
                        <AlertCircle className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0" />
                        <span>
                          Conflict detected! This teacher is already assigned to {teacherConflicts[0].subject} on {teacherConflicts[0].day} at {teacherConflicts[0].time}.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={handleSave}
                    disabled={!selectedSubject || !selectedTeacher || isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={handleClearSlot}
                  >
                    Clear Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTable;
