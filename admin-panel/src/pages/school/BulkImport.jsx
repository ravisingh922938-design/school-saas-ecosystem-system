import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const BulkImport = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bulk Data Import</h2>

            {/* Step Indicator */}
            <div className="flex gap-4 mb-8">
                <div className={`flex-1 p-3 border rounded-lg flex items-center gap-2 ${step === 1 ? 'bg-blue-50 border-blue-500 text-blue-700' : ''}`}>
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Upload
                </div>
                <div className={`flex-1 p-3 border rounded-lg flex items-center gap-2 ${step === 2 ? 'bg-blue-50 border-blue-500 text-blue-700' : ''}`}>
                    <span className="bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Map Columns
                </div>
                <div className={`flex-1 p-3 border rounded-lg flex items-center gap-2 ${step === 3 ? 'bg-blue-50 border-blue-500 text-blue-700' : ''}`}>
                    <span className="bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> Preview
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
                {step === 1 && (
                    <>
                        <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl p-10 cursor-pointer hover:bg-blue-100 transition">
                            <UploadCloud size={48} className="mx-auto text-blue-500 mb-4" />
                            <h3 className="font-bold text-lg text-gray-700">Drag & Drop Excel File here</h3>
                            <p className="text-gray-500 text-sm mt-2">or click to browse</p>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <button className="text-blue-600 font-bold flex items-center gap-2 text-sm">
                                <FileText size={16} /> Download Sample Template
                            </button>
                            <button onClick={() => setStep(2)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
                                Next Step
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div className="text-left">
                        <h3 className="font-bold mb-4">Map Columns</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500">Excel Column</label>
                                <div className="p-2 bg-gray-100 rounded border">Student Name</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500">Database Field</label>
                                <select className="w-full p-2 rounded border bg-white"><option>full_name</option></select>
                            </div>
                            <div>
                                <div className="p-2 bg-gray-100 rounded border">Father Mobile</div>
                            </div>
                            <div>
                                <select className="w-full p-2 rounded border bg-white"><option>parent_phone</option></select>
                            </div>
                        </div>
                        <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">Preview Data</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-left">
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                            <CheckCircle size={20} /> <strong>150 Rows Ready</strong> to import.
                        </div>
                        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg mb-4">
                            <AlertTriangle size={20} /> <strong>3 Rows Skipped</strong> due to errors.
                        </div>
                        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Start Import</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkImport;