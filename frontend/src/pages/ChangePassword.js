// frontend/src/pages/ChangePassword.js
import React, { useState } from 'react';

function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Implement password change logic via backend
    alert('Password change functionality is not implemented in this demo.');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label className="block mb-1">Current Password</label>
          <input 
            type="password" 
            name="currentPassword" 
            value={form.currentPassword} 
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input 
            type="password" 
            name="newPassword" 
            value={form.newPassword} 
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
