import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GlobalBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Yahan wo pages likhein jahan Back Button NAHI dikhna chahiye (Main Pages)
    const mainPages = [
        '/',
        '/select-role',
        '/super-admin',
        '/school',
        '/teacher',
        '/student'
    ];

    // Check karein: Agar hum Login page par hain ya Main Page par hain, to button mat dikhao
    const isMainPage = mainPages.includes(location.pathname) || location.pathname.includes('/login');

    if (isMainPage) return null;

    return (
        <button
            onClick={() => navigate(-1)} // -1 ka matlab: Ek kadam peeche jao
            className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            style={{ marginTop: 'env(safe-area-inset-top)' }} // Mobile notch ke liye safe area
        >
            <ArrowLeft size={24} />
        </button>
    );
};

export default GlobalBackButton;