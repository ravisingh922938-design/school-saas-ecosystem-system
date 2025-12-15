import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GlobalBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // In pages par Back button NAHI dikhana
    const mainPages = ['/', '/select-role', '/super-admin', '/school', '/teacher', '/student'];

    // Agar URL main pages me se ek hai, ya Login page hai
    const isMainPage = mainPages.includes(location.pathname) || location.pathname.includes('/login');

    if (isMainPage) return null;

    return (
        <button
            onClick={() => navigate(-1)}
            className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md border border-gray-200 text-gray-700 hover:text-blue-600 active:scale-95 transition-all cursor-pointer"
            style={{ marginTop: 'env(safe-area-inset-top)' }}
        >
            <ArrowLeft size={24} />
        </button>
    );
};

export default GlobalBackButton;