import React, { createContext, useState, useEffect, useContext } from 'react';

const SchoolThemeContext = createContext();

export const useSchoolTheme = () => useContext(SchoolThemeContext);

export const SchoolThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        name: 'SchoolOS',
        logo: 'https://cdn-icons-png.flaticon.com/512/1046/1046374.png',
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        tagline: 'Smart Management',
        address: 'SaaS Platform'
    });

    const loadSchoolTheme = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.schoolId?.includes('DPS')) {
                    setTheme({
                        name: 'Delhi Public School',
                        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Delhi_Public_School_Society_Logo.svg/1200px-Delhi_Public_School_Society_Logo.svg.png',
                        primaryColor: '#16a34a',
                        secondaryColor: '#14532d',
                        tagline: 'Service Before Self'
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadSchoolTheme();
    }, []);

    return (
        <SchoolThemeContext.Provider value={{ theme, loadSchoolTheme }}>
            {children}
        </SchoolThemeContext.Provider>
    );
};