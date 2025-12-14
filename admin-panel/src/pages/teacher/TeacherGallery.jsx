import React from 'react';
import { Camera, Plus, Trash2 } from 'lucide-react';

const TeacherGallery = () => {
    const photos = [
        { id: 1, url: "https://img.freepik.com/free-photo/kids-having-fun-school_23-2148199732.jpg", title: "Art Class" },
        { id: 2, url: "https://img.freepik.com/free-photo/teacher-helping-kids-class_23-2148888899.jpg", title: "Science Fair" },
        { id: 3, url: "https://img.freepik.com/free-photo/group-school-kids-raising-hands-classroom_23-2148199623.jpg", title: "Quiz Time" },
    ];

    return (
        <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Class Gallery 📸</h2>
                <button className="bg-black text-white p-3 rounded-full shadow-lg active:scale-90 transition">
                    <Camera size={20} />
                </button>
            </div>

            <div className="columns-2 gap-4 space-y-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative group break-inside-avoid">
                        <img src={photo.url} className="w-full rounded-2xl shadow-md border border-gray-100" />
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            <button className="bg-red-500 text-white p-2 rounded-full"><Trash2 size={16} /></button>
                        </div>
                        <p className="text-xs font-bold text-gray-600 mt-2 ml-1">{photo.title}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TeacherGallery;