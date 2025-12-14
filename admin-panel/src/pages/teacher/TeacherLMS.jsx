import React, { useState } from 'react';
import {
    Plus, Video, FileText, Image, Upload, X,
    Play, Clock, MoreVertical, Trash2
} from 'lucide-react';

const TeacherLMS = () => {
    const [activeTab, setActiveTab] = useState('classes'); // classes | materials
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('class'); // class | material

    // Dummy Data
    const [classes, setClasses] = useState([
        { id: 1, title: "Physics: Laws of Motion", time: "10:00 AM", status: "Live", thumbnail: "https://img.freepik.com/free-vector/physics-concept-illustration_114360-1209.jpg" },
        { id: 2, title: "Maths: Integration", time: "12:00 PM", status: "Scheduled", thumbnail: "https://img.freepik.com/free-vector/maths-chalkboard_23-2148178220.jpg" }
    ]);

    const [materials, setMaterials] = useState([
        { id: 1, name: "Chapter 1 Notes.pdf", size: "2MB" },
        { id: 2, name: "Formula Sheet.docx", size: "1.5MB" }
    ]);

    // --- ACTIONS ---
    const handleStartClass = (className) => {
        alert(`Starting Live Class: ${className} 🔴 \nConnecting to Server...`);
        // Real logic: Open Zoom/Meet SDK or navigate to video room
    };

    return (
        <div className="pb-24 p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gray-50 min-h-screen">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">My Classroom 🎓</h2>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-white border border-gray-200 rounded-xl mb-6 shadow-sm">
                <button
                    onClick={() => setActiveTab('classes')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'classes' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    Live Classes
                </button>
                <button
                    onClick={() => setActiveTab('materials')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'materials' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    Study Material
                </button>
            </div>

            {/* --- SECTION 1: LIVE CLASSES --- */}
            {activeTab === 'classes' && (
                <div className="space-y-5">
                    {classes.map((cls) => (
                        <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">

                            {/* Thumbnail Area */}
                            <div className="h-40 bg-gray-200 relative">
                                <img src={cls.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
                                <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-black/70">
                                    <MoreVertical size={16} className="text-white" />
                                </div>
                                {cls.status === 'Live' && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                                        LIVE NOW
                                    </span>
                                )}
                            </div>

                            {/* Info & Action */}
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">{cls.title}</h3>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <Clock size={12} /> Today, {cls.time}
                                        </p>
                                    </div>
                                </div>

                                {cls.status === 'Live' ? (
                                    <button
                                        onClick={() => handleStartClass(cls.title)}
                                        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-200 active:scale-95 transition flex items-center justify-center gap-2"
                                    >
                                        <Video size={20} /> RESUME CLASS
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleStartClass(cls.title)}
                                        className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-200 active:scale-95 transition flex items-center justify-center gap-2"
                                    >
                                        <Play size={20} /> START CLASS
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- SECTION 2: MATERIALS --- */}
            {activeTab === 'materials' && (
                <div className="space-y-3">
                    {materials.map((mat) => (
                        <div key={mat.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{mat.name}</h4>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">{mat.size}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 transition">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* FLOATING ADD BUTTON */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-24 right-5 bg-gray-900 text-white p-4 rounded-full shadow-2xl active:scale-90 transition z-40"
            >
                <Plus size={28} />
            </button>

            {/* --- UPLOAD MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {activeTab === 'classes' ? 'Schedule Class' : 'Upload Material'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        <form className="space-y-4">
                            {/* Common Input: Title */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Title / Topic</label>
                                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. Physics Chapter 1" />
                            </div>

                            {/* CLASS SPECIFIC FIELDS */}
                            {activeTab === 'classes' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Date</label>
                                            <input type="date" className="w-full p-3 border rounded-xl bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Time</label>
                                            <input type="time" className="w-full p-3 border rounded-xl bg-white" />
                                        </div>
                                    </div>

                                    {/* Thumbnail Upload */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Class Thumbnail</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 hover:border-teal-400 transition">
                                            <Image size={24} className="mx-auto text-gray-400 mb-2" />
                                            <p className="text-xs text-gray-500">Tap to upload Thumbnail</p>
                                        </div>
                                    </div>

                                    {/* Teacher Photo Upload */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Presenter Photo</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                                <UserIcon />
                                            </div>
                                            <button type="button" className="text-teal-600 text-sm font-bold border border-teal-200 px-4 py-2 rounded-lg hover:bg-teal-50">
                                                Change Photo
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* MATERIAL SPECIFIC FIELDS */}
                            {activeTab === 'materials' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">File (PDF/Doc)</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 hover:border-teal-400 transition">
                                        <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-xs text-gray-500">Tap to upload File</p>
                                    </div>
                                </div>
                            )}

                            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg mt-4 active:scale-95 transition">
                                {activeTab === 'classes' ? 'Schedule Live Class' : 'Upload Material'}
                            </button>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
};

// Helper Icon
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export default TeacherLMS;