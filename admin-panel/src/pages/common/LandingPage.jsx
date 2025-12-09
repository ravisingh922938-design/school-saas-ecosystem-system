import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BarChart, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            <nav className="w-full py-5 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="pl-[30px] pr-6 flex justify-between items-center max-w-7xl">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">SchoolSaaS</span>
                    </div>
                    <Link to="/select-role">
                        <button className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full font-medium transition-all">Login</button>
                    </Link>
                </div>
            </nav>
            <header className="relative py-20 lg:py-32">
                <div className="pl-[30px] pr-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
                            v2.0 is Live Now
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                            Manage your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">School Smartly.</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/select-role">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2">
                                    Get Started Now <ArrowRight size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
export default LandingPage;