import React from 'react';
import { Outlet } from 'react-router-dom';

const MobileLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">

            {/* Mobile Frame Container */}
            {/* Ye width ko limit karta hai taaki desktop par bhi Mobile jaisa dikhe */}
            <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-x-hidden">

                {/* Child Pages (Student/Teacher Dashboard) yahan render honge */}
                <Outlet />

            </div>
        </div>
    );
};

export default MobileLayout;