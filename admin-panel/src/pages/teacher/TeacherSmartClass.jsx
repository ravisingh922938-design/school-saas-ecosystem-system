import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X, Play, FileText, Upload, BookOpen, AlignLeft } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const TeacherSmartClass = () => {
    const [activeTab, setActiveTab] = useState('classes');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({ title: '', chapter: '', file: null, thumbnail: null });

    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.schoolId) return;
        try {
            const res = await axios.get(`${API_URL}/materials/list/${user.schoolId}`);
            setList(res.data.data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) return alert("File chuniye!");

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));

        const data = new FormData();
        data.append('file', formData.file);
        if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);
        data.append('title', formData.title);
        data.append('chapter', formData.chapter);
        data.append('type', activeTab === 'classes' ? 'class' : 'material');
        data.append('schoolId', user?.schoolId || "DEMO_SCHOOL");

        try {
            await axios.post(`${API_URL}/materials/upload`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("✅ Live Successful!");
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert("Upload Error: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Classroom Dashboard 🎓</h2>

            <div className="flex bg-white p-1 rounded-xl mb-6 shadow-sm border border-gray-200">
                <button onClick={() => setActiveTab('classes')} className={`flex-1 py-2 rounded-lg font-bold transition ${activeTab === 'classes' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500'}`}>Live Classes</button>
                <button onClick={() => setActiveTab('materials')} className={`flex-1 py-2 rounded-lg font-bold transition ${activeTab === 'materials' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500'}`}>Study Material</button>
            </div>

            <div className="space-y-4">
                {list.filter(i => i.type === activeTab.slice(0, -1)).map((item) => (
                    <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-teal-50 p-3 rounded-lg text-teal-600">
                                {item.type === 'class' ? <Play size={20} /> : <FileText size={20} />}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{item.title}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.chapter}</p>
                            </div>
                        </div>
                        <a href={item.videoUrl || item.pdfUrl} target="_blank" rel="noreferrer" className="text-teal-600 font-bold text-xs border border-teal-100 px-3 py-1 rounded-lg hover:bg-teal-50">VIEW</a>
                    </div>
                ))}
            </div>

            <button onClick={() => setShowModal(true)} className="fixed bottom-10 right-5 bg-gray-900 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 px-6 active:scale-95 transition">
                <Plus size={20} /> <span className="font-bold">Upload</span>
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl">Upload {activeTab === 'classes' ? 'Video Class' : 'PDF Study Material'}</h3>
                            <button onClick={() => setShowModal(false)} className="bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Title / Topic Name" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            <input type="text" placeholder="Chapter Name" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" onChange={e => setFormData({ ...formData, chapter: e.target.value })} />

                            {activeTab === 'classes' && (
                                <div className="border border-dashed p-3 rounded-xl border-gray-300">
                                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Class Thumbnail (Image)</label>
                                    <input type="file" accept="image/*" onChange={e => setFormData({ ...formData, thumbnail: e.target.files[0] })} className="text-xs" />
                                </div>
                            )}

                            <div className="border border-dashed p-3 rounded-xl border-blue-200 bg-blue-50">
                                <label className="text-[10px] font-bold text-blue-500 block mb-1 uppercase">Select {activeTab === 'classes' ? 'Video File' : 'PDF Document'}</label>
                                <input type="file" required onChange={e => setFormData({ ...formData, file: e.target.files[0] })} className="text-xs" />
                            </div>

                            <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 active:scale-95'}`}>
                                {loading ? 'Uploading Please Wait...' : 'Confirm & Publish Live'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherSmartClass;