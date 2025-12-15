import React, { useState } from 'react';
import {
    Plus, Video, FileText, Image, Upload, X,
    Play, Clock, MoreVertical, Trash2, BookOpen, AlignLeft
} from 'lucide-react';

const TeacherSmartClass = () => {
    const [activeTab, setActiveTab] = useState('classes'); // classes | materials
    const [showModal, setShowModal] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        title: '',
        chapter: '',
        description: '',
        date: '',
        time: '',
        file: null,
        thumbnail: null
    });

    // Dummy Data
    const [classes] = useState([
        { id: 1, title: "Physics: Laws of Motion", chapter: "Chapter 4", time: "10:00 AM", status: "Live", thumbnail: "https://img.freepik.com/free-vector/physics-concept-illustration_114360-1209.jpg" },
        { id: 2, title: "Maths: Integration", chapter: "Chapter 7", time: "12:00 PM", status: "Scheduled", thumbnail: "https://img.freepik.com/free-vector/maths-chalkboard_23-2148178220.jpg" }
    ]);

    const [materials] = useState([
        { id: 1, name: "Chapter 1 Notes.pdf", chapter: "Physical World", size: "2MB" },
        { id: 2, name: "Formula Sheet.docx", chapter: "All Chapters", size: "1.5MB" }
    ]);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [type]: file });
        }
    };

    return (
        <div className="pb-24 p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gray-50 min-h-screen font-sans">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">My Classroom 🎓</h2>
            </div>

            {/* Top Tabs */}
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

            {/* --- CONTENT LIST --- */}
            <div className="space-y-5">
                {activeTab === 'classes' ? (
                    classes.map((cls) => (
                        <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                            <div className="h-40 bg-gray-200 relative">
                                <img src={cls.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
                                {cls.status === 'Live' && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">LIVE NOW</span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 text-lg">{cls.title}</h3>
                                <p className="text-xs text-gray-500 font-medium mb-3">{cls.chapter}</p>
                                <button className={`w-full text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition flex items-center justify-center gap-2 ${cls.status === 'Live' ? 'bg-red-600 shadow-red-200' : 'bg-teal-600 shadow-teal-200'}`}>
                                    {cls.status === 'Live' ? <Video size={20} /> : <Play size={20} />}
                                    {cls.status === 'Live' ? 'RESUME CLASS' : 'START CLASS'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    materials.map((mat) => (
                        <div key={mat.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600"><FileText size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{mat.name}</h4>
                                    <p className="text-[10px] text-gray-500 font-bold">{mat.chapter} • {mat.size}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                        </div>
                    ))
                )}
            </div>

            {/* --- FLOATING ADD BUTTON --- */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-24 right-5 bg-gray-900 text-white p-4 rounded-full shadow-2xl active:scale-90 transition z-40 flex items-center gap-2 pr-6"
            >
                <Plus size={24} />
                <span className="font-bold text-sm">Upload</span>
            </button>

            {/* --- 📝 UPLOAD MODAL (FORM) --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-0 sm:p-4">
                    <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {activeTab === 'classes' ? 'Schedule New Class' : 'Upload Notes'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        <form className="space-y-4">

                            {/* 1. Title */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><BookOpen size={14} /> Title / Topic</label>
                                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                    placeholder={activeTab === 'classes' ? "e.g. Physics Lecture 01" : "e.g. Formula Sheet PDF"}
                                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            {/* 2. Chapter Name */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><AlignLeft size={14} /> Chapter Name</label>
                                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                    placeholder="e.g. Laws of Motion"
                                    value={formData.chapter} onChange={(e) => setFormData({ ...formData, chapter: e.target.value })} />
                            </div>

                            {/* 3. Description */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><FileText size={14} /> Description</label>
                                <textarea rows="3" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium resize-none"
                                    placeholder="Enter details about this class/material..."
                                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            {/* 4. Class Specific Fields */}
                            {activeTab === 'classes' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-1">Date</label>
                                            <input type="date" className="w-full p-3 border rounded-xl bg-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-1">Time</label>
                                            <input type="time" className="w-full p-3 border rounded-xl bg-white" />
                                        </div>
                                    </div>

                                    {/* Thumbnail Upload */}
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><Image size={14} /> Class Thumbnail</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 hover:border-teal-400 transition bg-gray-50">
                                            {formData.thumbnail ? (
                                                <p className="text-green-600 font-bold text-sm">Image Selected ✅</p>
                                            ) : (
                                                <>
                                                    <Image size={24} className="mx-auto text-gray-400 mb-2" />
                                                    <p className="text-xs text-gray-500">Click to upload Cover Image</p>
                                                </>
                                            )}
                                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* 5. File Upload (Video/PDF) */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
                                    <Upload size={14} /> Upload {activeTab === 'classes' ? 'Video (Optional)' : 'Document'}
                                </label>
                                <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer hover:bg-blue-100 transition relative">
                                    <div className="bg-white p-2 rounded-full text-blue-600"><Upload size={20} /></div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-blue-700">Choose File</p>
                                        <p className="text-[10px] text-blue-400">Max size: 500MB</p>
                                    </div>
                                    <input type="file" onChange={(e) => handleFileChange(e, 'file')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg mt-4 active:scale-95 transition">
                                {activeTab === 'classes' ? 'Create Class' : 'Upload Material'}
                            </button>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherSmartClass;