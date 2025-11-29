import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [siteTitle, setSiteTitle] = useState('Super Admin Portal');
  const [logoFile, setLogoFile] = useState(null);
  const [globalTaxGst, setGlobalTaxGst] = useState(18);
  const [defaultPlatformFee, setDefaultPlatformFee] = useState(20);
  const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
      alert(`Logo file selected: ${file.name}`);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setLogoFile(file);
      alert(`Logo file dropped: ${file.name}`);
    }
  };

  const handleForceLogout = () => {
    alert('Simulating force logout for all users.');
    // Implement actual logout API call here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar/Tabs */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
          <nav>
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left py-2 px-4 rounded-md text-sm font-medium focus:outline-none
                ${activeTab === 'general' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700'}`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('billing-config')}
              className={`mt-2 w-full text-left py-2 px-4 rounded-md text-sm font-medium focus:outline-none
                ${activeTab === 'billing-config' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700'}`}
            >
              Billing Config
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`mt-2 w-full text-left py-2 px-4 rounded-md text-sm font-medium focus:outline-none
                ${activeTab === 'security' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700'}`}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Title</label>
                  <input
                    type="text"
                    id="siteTitle"
                    name="siteTitle"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo Upload</label>
                  <div
                    className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer dark:border-slate-600"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('logo-upload').click()}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-300"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4L28 28m-4-4L28 28m-4-4L28 28m-4-4L28 28"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 dark:text-gray-300">
                        <p className="pl-1">{logoFile ? logoFile.name : 'Drag and drop or click to upload logo'}</p>
                      </div>
                      <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing-config' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Billing Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="globalTaxGst" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Global Tax/GST %</label>
                  <input
                    type="number"
                    id="globalTaxGst"
                    name="globalTaxGst"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                    value={globalTaxGst}
                    onChange={(e) => setGlobalTaxGst(e.target.value)}
                    defaultValue={18}
                  />
                </div>
                <div>
                  <label htmlFor="defaultPlatformFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Platform Fee (₹)</label>
                  <input
                    type="number"
                    id="defaultPlatformFee"
                    name="defaultPlatformFee"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                    value={defaultPlatformFee}
                    onChange={(e) => setDefaultPlatformFee(e.target.value)}
                    defaultValue={20}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <button
                    onClick={handleForceLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Force Logout All Users
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="enableTwoFactorAuth" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="enableTwoFactorAuth"
                        name="enableTwoFactorAuth"
                        className="sr-only"
                        checked={enableTwoFactorAuth}
                        onChange={(e) => setEnableTwoFactorAuth(e.target.checked)}
                      />
                      <div className={`block w-14 h-8 rounded-full ${enableTwoFactorAuth ? 'bg-green-500' : 'bg-gray-600 dark:bg-slate-600'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${enableTwoFactorAuth ? 'translate-x-full' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium dark:text-gray-100">Enable Two-Factor Auth for Admins</div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
