import React from 'react';

const Schools = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Registered Schools</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Add New School
                </button>
            </div>

            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b">School Name</th>
                        <th className="p-3 border-b">City</th>
                        <th className="p-3 border-b">Status</th>
                        <th className="p-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b">Delhi Public School</td>
                        <td className="p-3 border-b">New Delhi</td>
                        <td className="p-3 border-b"><span className="text-green-600 font-bold">Active</span></td>
                        <td className="p-3 border-b">
                            <button className="text-blue-500 hover:underline">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Schools;