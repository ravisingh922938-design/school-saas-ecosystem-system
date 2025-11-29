import { useContext } from 'react';
import { SchoolAuthContext } from '../context/AuthContext';

const useTerminology = () => {
  const { schoolType } = useContext(SchoolAuthContext);

  if (schoolType === 'School') {
    return { class: 'Class', student: 'Student' };
  } else if (schoolType === 'Coaching') {
    return { class: 'Batch', student: 'Aspirant' };
  } else {
    // Default or fallback terminology if schoolType is not yet loaded or unknown
    return { class: 'Class', student: 'Student' };
  }
};

export default useTerminology;


