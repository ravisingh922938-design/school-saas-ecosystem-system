import React, { useState } from 'react';
import { User, Book, CreditCard, Save, ArrowLeft, ArrowRight } from 'lucide-react';

const AdmissionForm = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">New Student Admission</h1>

            {/* Steps Indicator */}
            <div className="flex gap-4 mb-8">
                <div className={`flex-1 p-4 rounded-xl border flex items-center gap-3 transition-all ${step === 1 ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                    <span className="font-semibold">Personal Details</span>
                </div>
                <div className={`flex-1 p-4 rounded-xl border flex items-center gap-3 transition-all ${step === 2 ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                    <span className="font-semibold">Academic Info</span>
                </div>
                <div className={`flex-1 p-4 rounded-xl border flex items-center gap-3 transition-all ${step === 3 ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                    <span className="font-semibold">Fee Setup</span>
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

                {/* STEP 1: Personal */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Student Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">First Name</label>
                                <input type="text" placeholder="e.g. Rahul" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Last Name</label>
                                <input type="text" placeholder="e.g. Sharma" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Date of Birth</label>
                                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Gender</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                    <option>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Father's Name</label>
                                <input type="text" placeholder="e.g. Mr. Rajesh Sharma" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Parent Mobile (Login ID)</label>
                                <div className="flex">
                                    <span className="p-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 font-bold">+91</span>
                                    <input type="tel" placeholder="9876543210" className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <p className="text-xs text-blue-500 mt-1">This number will be used for Student App Login.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: Academic */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Academic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Class</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                    <option>Select Class</option>
                                    <option>Class 10</option>
                                    <option>Class 9</option>
                                    <option>Class 8</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Section</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                    <option>Select Section</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Roll Number</label>
                                <input type="text" placeholder="Auto-Generated" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Admission Date</label>
                                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Fees */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Fee Configuration</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-500" checked readOnly />
                                    <div>
                                        <span className="font-bold text-green-800 block">Collect Admission Fee</span>
                                        <span className="text-xs text-green-600">One time charge</span>
                                    </div>
                                </div>
                                <span className="font-bold text-green-800 text-lg">₹ 5,000</span>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 bg-white rounded-xl cursor-pointer hover:border-blue-300 transition">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                                    <div>
                                        <span className="font-bold text-gray-700 block">Assign Transport Route</span>
                                        <span className="text-xs text-gray-500">Add Bus Fee to monthly bill</span>
                                    </div>
                                </div>
                                <Book className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 flex items-center gap-2">
                            <ArrowLeft size={18} /> Back
                        </button>
                    ) : (
                        <div></div> // Empty div for spacing
                    )}

                    {step < 3 ? (
                        <button onClick={() => setStep(step + 1)} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2">
                            Next Step <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 flex items-center gap-2">
                            <Save size={18} /> Confirm Admission
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdmissionForm;