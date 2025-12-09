import React, { useState } from 'react';
import api from '../../services/api';

const AddTeacher = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // LocalStorage se School Admin ka data nikalo
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;

            if (!user || !user.schoolId) {
                alert("Error: You are not logged in as a School Admin!");
                return;
            }

            // Payload mein schoolId jodna zaruri hai
            const payload = { ...formData, schoolId: user.schoolId };

            const res = await api.post('/users/add-teacher', payload);

            if (res.data.success) {
                setMessage("✅ Teacher Added Successfully!");
                setFormData({ name: '', email: '', password: '' }); // Form clear
            }

        } catch (error) {
            console.error(error);
            setMessage("❌ Error Adding Teacher. Email might maintain exist.");
        }
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Teacher</h2>

            {message && <div className={`p-3 mb-4 rounded ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email (Login ID)</label>
                    <input type="email" className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="text" className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} required />
                </div>

                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">Create Teacher Account</button>
            </form>
        </div>
    );
};

export default AddTeacher;