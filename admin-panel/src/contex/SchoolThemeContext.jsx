import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SchoolThemeContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useSchoolTheme = () => useContext(SchoolThemeContext);

export const SchoolThemeProvider = ({ children }) => {
    // Default (SchoolOS Branding)
    const [theme, setTheme] = useState({
        name: 'SchoolOS',
        logo: 'https://cdn-icons-png.flaticon.com/512/1046/1046374.png',
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        tagline: 'Smart Management',
        address: 'SaaS Platform'
    });

    const loadSchoolTheme = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        // Agar user logged in hai aur wo Super Admin nahi hai
        if (user && user.schoolId && user.role !== 'super-admin') {
            try {
                const { data } = await axios.get(`${API_URL}/school-data/details/${user.schoolId}`);
                if (data.success) {
                    const s = data.data;
                    setTheme({
                        name: s.name,
                        logo: s.branding.logo,
                        primaryColor: s.branding.primaryColor,
                        secondaryColor: s.branding.secondaryColor,
                        tagline: s.branding.tagline,
                        address: s.contact.address
                    });
                }
            } catch (err) {
                console.error("Theme Load Failed:", err);
            }
        }
    };

    // CSS Variables set karna (Taaki Tailwind Colors badal jayein)
    useEffect(() => {
        document.documentElement.style.setProperty('--primary', theme.primaryColor);
        document.documentElement.style.setProperty('--secondary', theme.secondaryColor);
    }, [theme]);

    useEffect(() => {
        loadSchoolTheme();
    }, []);

    return (
        <SchoolThemeContext.Provider value={{ theme, loadSchoolTheme }}>
            {children}
        </SchoolThemeContext.Provider>
    );
};