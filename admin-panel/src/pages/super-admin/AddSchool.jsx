import React, { useState } from 'react';
import api from '../../services/api'; // API connect karne ke liye

const AddSchool = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        address: '',
        schoolCode: '' 
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API Call to Backend
            const res = await api.post('/schools/register', formData);
            if (res.data.success) {
                setMessage('✅ School Created Successfully!');
                setFormData({ name: '', email: '', phone: '', address: '', schoolCode: '' }); // Reset form
            }
        } catch (error) {
            setMessage('❌ Error Creating School');
        }
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-md max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Onboard New School</h2>

            {message && <div className="p-3 mb-4 bg-blue-50 text-blue-700 rounded">{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text" 
                        placeholder="School Name" 
                        className="w-full p-3 border rounded-lg mb-4"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        value={formData.name} 
                        required
                    />
                </div>
                <div>
                    <input
                        type="text" 
                        placeholder="School Code (e.g., DPS, KV) - Max 5 uppercase letters" 
                        className="w-full p-3 border rounded-lg mb-4 uppercase"
                        onChange={(e) => {
                            // Convert to uppercase and limit to 5 characters
                            const code = e.target.value.toUpperCase().substring(0, 5);
                            setFormData({ ...formData, schoolCode: code });
                        }}
                        value={formData.schoolCode}
                        pattern="[A-Z0-9]{2,5}"
                        title="2-5 uppercase alphanumeric characters"
                        required
                    />
                    <p className="text-sm text-gray-500 mb-4 -mt-3">This will be used to generate student enrollment IDs (e.g., {formData.schoolCode || 'SCH'}-2024-0001)</p>
                </div>
                <input
                    type="email" placeholder="Admin Email" className="w-full p-3 border rounded-lg"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} required
                />
                <input
                    type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} value={formData.phone}
                />
                <textarea
                    placeholder="Address" className="w-full p-3 border rounded-lg"
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address}
                />
                <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700">
                    Create School
                </button>
            </form>
        </div>
    );
};

export default AddSchool;