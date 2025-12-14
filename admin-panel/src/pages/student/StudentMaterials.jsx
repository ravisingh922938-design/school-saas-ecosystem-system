import React from 'react';
import { FileText, Download, Search, Folder } from 'lucide-react';

const StudentMaterials = () => {
    const materials = [
        { name: "Maths Formula Sheet.pdf", size: "2.4 MB", type: "PDF" },
        { name: "History Chapter 1 Notes.pdf", size: "1.1 MB", type: "PDF" },
        { name: "Science Lab Manual.docx", size: "5.0 MB", type: "DOC" },
    ];

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 p-4">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Study Material 📥</h2>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="text" placeholder="Search notes..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
            </div>

            {/* Folders */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-2">
                {['Physics', 'Chemistry', 'Maths', 'English'].map((sub, i) => (
                    <div key={i} className="min-w-[100px] bg-blue-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-blue-600 border border-blue-100 active:scale-95 transition">
                        <Folder size={28} fill="currentColor" className="opacity-20" />
                        <span className="text-xs font-bold">{sub}</span>
                    </div>
                ))}
            </div>

            {/* Files List */}
            <h3 className="font-bold text-gray-700 mb-3 mt-2">Recent Uploads</h3>
            <div className="space-y-3">
                {materials.map((file, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2.5 rounded-xl text-red-600">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{file.name}</h4>
                                <p className="text-[10px] text-gray-400">{file.size} • {file.type}</p>
                            </div>
                        </div>
                        <button className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200 active:scale-90 transition">
                            <Download size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentMaterials;