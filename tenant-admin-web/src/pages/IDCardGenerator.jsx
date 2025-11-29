import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import useTerminology from '../hooks/useTerminology';

const IDCard = ({ student, terminology }) => (
  <div className="id-card-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px', textAlign: 'center' }}>
    <img src="/vite.svg" alt="School Logo" style={{ width: '50px', height: '50px', marginBottom: '5px' }} /> {/* Replace with actual school logo */}
    <img src="https://via.placeholder.com/100" alt="Student Photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} /> {/* Replace with actual student photo */}
    <h3>{student.name}</h3>
    <p>{terminology.student} Roll No: {student.rollNo}</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=StudentQR" alt="QR Code" style={{ width: '50px', height: '50px', marginTop: '10px' }} /> {/* Dummy QR Code */}
  </div>
);

const IDCardGenerator = () => {
  const { class: classTerminology, student: studentTerminology } = useTerminology();
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Placeholder student data
  const allStudents = {
    "10A": [
      { id: 1, name: "Alice Smith", rollNo: "DPS-2025-001", photo: "" },
      { id: 2, name: "Bob Johnson", rollNo: "DPS-2025-002", photo: "" },
      { id: 3, name: "Charlie Brown", rollNo: "DPS-2025-003", photo: "" },
      { id: 4, name: "Diana Prince", rollNo: "DPS-2025-004", photo: "" },
      { id: 5, name: "Clark Kent", rollNo: "DPS-2025-005", photo: "" },
    ],
    "12B": [
      { id: 6, name: "Bruce Wayne", rollNo: "DPS-2025-006", photo: "" },
      { id: 7, name: "Selina Kyle", rollNo: "DPS-2025-007", photo: "" },
      { id: 8, name: "Barry Allen", rollNo: "DPS-2025-008", photo: "" },
    ],
    "Batch A": [
      { id: 9, name: "Peter Parker", rollNo: "COACH-2025-001", photo: "" },
      { id: 10, name: "Mary Jane", rollNo: "COACH-2025-002", photo: "" },
    ],
  };

  const availableClasses = Object.keys(allStudents);

  const fetchStudents = (className) => {
    // In a real application, this would be an API call
    setStudents(allStudents[className] || []);
  };

  const handleClassChange = (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    fetchStudents(className);
  };

  return (
    <div className="id-card-generator-container" style={{ padding: '20px' }}>
      <h2>{studentTerminology} ID Card Generator</h2>

      <div className="class-selection" style={{ marginBottom: '20px' }}>
        <label htmlFor="classSelect">Select {classTerminology}: </label>
        <select id="classSelect" value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a {classTerminology}</option>
          {availableClasses.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handlePrint} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
        Print PDF
      </button>

      <div ref={componentRef} className="id-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {students.length > 0 ? (
          students.map((student) => (
            <IDCard key={student.id} student={student} terminology={{ class: classTerminology, student: studentTerminology }} />
          ))
        ) : (
          <p>No {studentTerminology}s found for this {classTerminology}.</p>
        )}
      </div>
    </div>
  );
};

export default IDCardGenerator;

