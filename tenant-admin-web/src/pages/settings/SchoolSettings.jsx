import { useState, useRef } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { Upload, Building2, Mail, Phone, Bell, CreditCard, Cake, Save } from 'lucide-react';

const SchoolSettings = () => {
  const { terms, institutionType, setInstitutionType } = useTerminology();
  const [settings, setSettings] = useState({
    instituteName: 'ABC Public School',
    address: '123 Education Street, Knowledge City, 560001',
    contactEmail: 'info@abcschool.edu.in',
    contactPhone: '+91 98765 43210',
    autoSMS: true,
    onlinePayment: true,
    showBirthdayWidget: true,
  });
  
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('https://via.placeholder.com/150');
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: false, message: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would upload the logo and save settings to your backend
      if (logo) {
        // Handle logo upload
        console.log('Uploading logo:', logo);
      }
      
      console.log('Saving settings:', settings);
      
      setSaveStatus({
        success: true,
        message: 'Settings saved successfully!'
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus({
        success: false,
        message: 'Failed to save settings. Please try again.'
      });
    } finally {
      setIsSaving(false);
      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus({ success: false, message: '' });
      }, 3000);
    }
  };

  const handleInstitutionTypeChange = (e) => {
    setInstitutionType(e.target.value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your institution's profile and system settings
        </p>
      </div>

      {saveStatus.message && (
        <div className={`rounded-md p-4 ${saveStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className={`text-sm ${saveStatus.success ? 'text-green-700' : 'text-red-700'}`}>
            {saveStatus.message}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        {/* Profile Section */}
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Institution Profile</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed on ID cards and official documents.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Institute Logo
                </label>
                <div className="mt-1 flex items-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-300">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Change
                    </div>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Recommended size: 300x300px (PNG, JPG, or SVG)
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700">
                  Institute Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="instituteName"
                    id="instituteName"
                    value={settings.instituteName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="email"
                    name="contactEmail"
                    id="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleInputChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Toggles */}
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">System Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configure system behavior and preferences
            </p>
          </div>

          <div className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Enable Auto-SMS on Absent</div>
                    <p className="text-sm text-gray-500">
                      Automatically send SMS to parents when a student is marked absent
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoSMS"
                    checked={settings.autoSMS}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Enable Online Fee Payment</div>
                    <p className="text-sm text-gray-500">
                      Allow parents to pay fees online through payment gateway
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="onlinePayment"
                    checked={settings.onlinePayment}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center">
                  <Cake className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Show Birthday Widget on Dashboard</div>
                    <p className="text-sm text-gray-500">
                      Display upcoming birthdays on the main dashboard
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="showBirthdayWidget"
                    checked={settings.showBirthdayWidget}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Terminology Switch */}
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Terminology Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Switch between different institution types to test dynamic labels
            </p>
          </div>

          <div className="mt-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700">
                  Institution Type (For Testing)
                </label>
                <select
                  id="institutionType"
                  name="institutionType"
                  value={institutionType}
                  onChange={handleInstitutionTypeChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="School">School</option>
                  <option value="Coaching">Coaching</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Current mode: <span className="font-medium">{institutionType} Mode</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Example: Students are referred to as "{terms.students}" and classes as "{terms.classes}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SchoolSettings;
