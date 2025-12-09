import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    // Function to Fetch Data
    const fetchStudents = async (pageNum, searchTerm = '') => {
        setLoading(true);
        try {
            // Backend ko Page No bhejo
            const { data } = await api.get(`/school/students?page=${pageNum}&limit=20&search=${searchTerm}`);
            setStudents(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error loading students");
        } finally {
            setLoading(false);
        }
    };

    // Initial Load & Search
    useEffect(() => {
        // Debounce Search (Wait 500ms before calling API)
        const delayDebounceFn = setTimeout(() => {
            setPage(1); // Reset to page 1 on new search
            fetchStudents(1, search);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Page Change
    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchStudents(newPage, search);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            {/* Search Bar */}
            <div className="p-4 border-b">
                <input
                    type="text"
                    placeholder="Search 1L+ Students..."
                    className="w-full border p-2 rounded-lg"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Enrollment ID</th>
                        <th className="p-4">Roll No</th>
                        <th className="p-4">Class</th>
                        <th className="p-4">Fees Due</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="5" className="p-4 text-center">Loading Data...</td></tr>
                    ) : students.map((s) => (
                        <tr key={s._id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-bold">{s.name}</td>
                            <td className="p-4">
                                {s.enrollmentId ? (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {s.enrollmentId}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 text-xs">Not assigned</span>
                                )}
                            </td>
                            <td className="p-4">{s.rollNo}</td>
                            <td className="p-4">{s.class}</td>
                            <td className="p-4 text-red-600 font-bold">₹ {s.fees?.due || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="p-4 flex justify-between items-center bg-gray-50">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="px-4 py-2 bg-white border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 bg-white border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StudentList;