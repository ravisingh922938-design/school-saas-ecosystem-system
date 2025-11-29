import React, { createContext, useContext, useState, useMemo } from 'react';

const TerminologyContext = createContext();

export const TerminologyProvider = ({ children }) => {
  const [institutionType, setInstitutionType] = useState('School');

  const terms = useMemo(() => {
    return institutionType === 'School'
      ? {
          class: 'Class',
          student: 'Student',
          teacher: 'Teacher',
          section: 'Section'
        }
      : {
          class: 'Batch',
          student: 'Aspirant',
          teacher: 'Faculty',
          section: 'Slot'
        };
  }, [institutionType]);

  const value = {
    institutionType,
    setInstitutionType,
    terms
  };

  return (
    <TerminologyContext.Provider value={value}>
      {children}
    </TerminologyContext.Provider>
  );
};

export const useTerminology = () => {
  const context = useContext(TerminologyContext);
  if (!context) {
    throw new Error('useTerminology must be used within a TerminologyProvider');
  }
  return context;
};

export default TerminologyContext;
