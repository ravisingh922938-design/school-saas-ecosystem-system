import React, { useState } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        alert('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters long.');
      return;
    }
    // Simulate API call to change password
    console.log('Changing password...', { currentPassword, newPassword });
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Simulating account deletion.');
      // Implement actual account deletion API call and logout/redirect
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Profile Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Profile Card */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col items-center dark:bg-slate-800 dark:border dark:border-slate-700">
          <div className="relative mb-4">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-700"
            />
            <label htmlFor="profile-picture-upload" className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
              <Camera className="h-5 w-5 text-white" />
              <input
                id="profile-picture-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            </label>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Super Admin</h2>
          <p className="text-gray-600 text-sm dark:text-gray-300">Super Admin Role</p>
          <p className="text-gray-500 text-sm mt-2 p-2 bg-gray-100 rounded-md dark:bg-slate-700 dark:text-gray-200">admin@example.com</p>
        </div>

        {/* Right Column: Security Settings */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Security Settings</h2>
          <form onSubmit={handleChangePassword} className="space-y-4 mb-8">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Update Password
            </button>
          </form>

          {/* Danger Zone */}
          <div className="mt-8 p-4 border border-red-300 bg-red-50 rounded-lg dark:bg-red-950 dark:border-red-900">
            <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2 mb-2 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" /> Danger Zone
            </h3>
            <p className="text-sm text-red-600 mb-4 dark:text-red-300">Permanently delete your account and all its data. This action cannot be undone.</p>
            <button
              onClick={handleDeleteAccount}
              className="border border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded-md transition-colors dark:border-red-700 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
