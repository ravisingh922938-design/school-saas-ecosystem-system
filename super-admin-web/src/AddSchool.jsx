import React, { useState } from 'react';

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instituteCode, setInstituteCode] = useState('');
  const [platformSurcharge, setPlatformSurcharge] = useState('');
  const [enableTransport, setEnableTransport] = useState(false);
  const [enableSms, setEnableSms] = useState(false);
  const [enableOnlineExam, setEnableOnlineExam] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSchool = {
      schoolName,
      email,
      password,
      instituteCode,
      platformSurcharge: parseFloat(platformSurcharge),
      enableTransport,
      enableSms,
      enableOnlineExam,
    };

    try {
      const response = await fetch('/api/super-admin/create-school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchool),
      });

      if (response.ok) {
        alert('School added successfully!');
        // Optionally reset form fields
        setSchoolName('');
        setEmail('');
        setPassword('');
        setInstituteCode('');
        setPlatformSurcharge('');
        setEnableTransport(false);
        setEnableSms(false);
        setEnableOnlineExam(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to add school: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding school:', error);
      alert('An error occurred while adding the school.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New School</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
          <input
            type="text"
            id="schoolName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="instituteCode" className="block text-sm font-medium text-gray-700">Institute Code</label>
          <input
            type="text"
            id="instituteCode"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={instituteCode}
            onChange={(e) => setInstituteCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="platformSurcharge" className="block text-sm font-medium text-gray-700">Platform Surcharge</label>
          <input
            type="number"
            id="platformSurcharge"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={platformSurcharge}
            onChange={(e) => setPlatformSurcharge(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="enableTransport" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="enableTransport"
                className="sr-only"
                checked={enableTransport}
                onChange={(e) => setEnableTransport(e.target.checked)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${enableTransport ? 'translate-x-full bg-blue-500' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">Enable Transport</div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="enableSms" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="enableSms"
                className="sr-only"
                checked={enableSms}
                onChange={(e) => setEnableSms(e.target.checked)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${enableSms ? 'translate-x-full bg-blue-500' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">Enable SMS</div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="enableOnlineExam" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="enableOnlineExam"
                className="sr-only"
                checked={enableOnlineExam}
                onChange={(e) => setEnableOnlineExam(e.target.checked)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${enableOnlineExam ? 'translate-x-full bg-blue-500' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">Enable Online Exam</div>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add School
        </button>
      </form>
    </div>
  );
};

export default AddSchool;
