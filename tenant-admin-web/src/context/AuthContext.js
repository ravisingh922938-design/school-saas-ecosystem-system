import React, { createContext, useState, useEffect, useContext } from 'react';

export const SchoolAuthContext = createContext(null);

export const SchoolAuthProvider = ({ children }) => {
  const [schoolType, setSchoolType] = useState(null);

  useEffect(() => {
    const storedSchool = localStorage.getItem('school');
    if (storedSchool) {
      try {
        const school = JSON.parse(storedSchool);
        setSchoolType(school.type); // Assuming the school object has a 'type' property
      } catch (error) {
        console.error("Failed to parse school data from localStorage:", error);
      }
    }
  }, []);

  return (
    <SchoolAuthContext.Provider value={{ schoolType, setSchoolType }}>
      {children}
    </SchoolAuthContext.Provider>
  );
};

export const useSchoolAuth = () => useContext(SchoolAuthContext);


