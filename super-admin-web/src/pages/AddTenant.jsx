import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTenant } from '../services/api';

const AddTenant = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', // Changed from institutionName
    email: '', // Changed from ownerEmail
    type: 'School',
    studentCount: 0, // Added default for studentCount
    revenueModel: 'Subscription',
    commercials: {
      platformFee: 20,
      admissionFee: 100,
    },
    features: {
      transport: false,
      library: false,
      hostel: false,
      sms: false,
    },
    status: 'Active', // Added default for status
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'platformFee' || name === 'admissionFee') {
      setFormData((prevData) => ({
        ...prevData,
        commercials: {
          ...prevData.commercials,
          [name]: type === 'number' ? parseFloat(value) : value,
        },
      }));
    } else if (['transport', 'library', 'hostel', 'sms'].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        features: {
          ...prevData.features,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tenantData = {
        name: formData.institutionName,
        email: formData.ownerEmail,
        type: formData.type,
        studentCount: formData.studentCount,
        revenueModel: formData.revenueModel,
        commercials: {
          platformFee: parseFloat(formData.platformFee),
          admissionFee: parseFloat(formData.onlineAdmissionFee),
        },
        features: {
          transport: formData.enableTransportModule,
          library: formData.enableLibrary,
          hostel: formData.enableHostelManagement,
          sms: formData.enableSmsPack,
        },
        status: 'Active',
      };
      await createTenant(tenantData);
      alert('Tenant Created!'); // Replace with Toast notification
      navigate('/tenants');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg === 'Tenant with this email already exists') {
        alert('Email already registered');
      } else {
        console.error('Error creating tenant:', error);
        alert('Error creating tenant. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">Add New Tenant</h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
        <div className="flex items-center">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}>
            1
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-2 dark:bg-slate-700"></div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}>
            2
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-2 dark:bg-slate-700"></div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
          <span>Step 1: Identity</span>
          <span>Step 2: Commercials</span>
          <span>Step 3: Features</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Step 1: Identity</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institute Name</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.institutionName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Owner Name</label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="ownerEmail"
                  name="ownerEmail"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institute Type</label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="School">School</option>
                  <option value="Coaching">Coaching</option>
                  <option value="College">College</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Step 2: Commercials</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="platformFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform Fee per Student (₹)</label>
                <input
                  type="number"
                  id="platformFee"
                  name="platformFee"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.commercials.platformFee}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="onlineAdmissionFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Online Admission Fee (₹)</label>
                <input
                  type="number"
                  id="onlineAdmissionFee"
                  name="admissionFee"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                  value={formData.commercials.admissionFee}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">Revenue Model</span>
                <div className="mt-2 flex space-x-4">
                  <div
                    className={`flex-1 p-4 border rounded-md cursor-pointer ${formData.revenueModel === 'Subscription' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-500' : 'border-gray-300 dark:border-slate-600'} dark:bg-slate-700 dark:text-gray-100`}
                    onClick={() => setFormData({ ...formData, revenueModel: 'Subscription' })}
                  >
                    <p className="font-semibold">Subscription</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Fixed fee per month/year</p>
                  </div>
                  <div
                    className={`flex-1 p-4 border rounded-md cursor-pointer ${formData.revenueModel === 'Commission' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-500' : 'border-gray-300 dark:border-slate-600'} dark:bg-slate-700 dark:text-gray-100`}
                    onClick={() => setFormData({ ...formData, revenueModel: 'Commission' })}
                  >
                    <p className="font-semibold">Commission</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Percentage of fees collected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Step 3: Feature Toggles</h2>
            <div className="space-y-4">
              {[{
                name: 'transport',
                label: 'Transport Module'
              },
              {
                name: 'hostel',
                label: 'Hostel Management'
              },
              {
                name: 'library',
                label: 'Library'
              },
              {
                name: 'sms',
                label: 'SMS Pack'
              },
              ].map((toggle) => (
                <div key={toggle.name} className="flex items-center justify-between">
                  <label htmlFor={toggle.name} className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={toggle.name}
                        name={toggle.name}
                        className="sr-only"
                        checked={formData.features[toggle.name]}
                        onChange={handleChange}
                      />
                      <div className={`block w-14 h-8 rounded-full ${formData.features[toggle.name] ? 'bg-green-500' : 'bg-gray-600 dark:bg-slate-600'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${formData.features[toggle.name] ? 'translate-x-full' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium dark:text-gray-100">{toggle.label}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-100"
            >
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto"
            >
              Create Tenant
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTenant;
