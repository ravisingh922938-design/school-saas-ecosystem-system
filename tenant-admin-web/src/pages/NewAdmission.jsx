import React, { useState } from 'react';
import useTerminology from '../hooks/useTerminology';

const NewAdmission = () => {
  const { student } = useTerminology();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [collectFee, setCollectFee] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for backend call to generate RollNo and save student
    console.log('Submitting admission form...');
    console.log({ name, gender, mobile, collectFee });

    // Simulate API call
    try {
      const response = await new Promise(resolve => setTimeout(() => {
        resolve({ rollNo: 'DPS-2025-01', message: `${student} admitted successfully!` });
      }, 1000));

      alert(`${response.message} Roll No: ${response.rollNo}`);
      // Reset form
      setName('');
      setGender('');
      setMobile('');
      setCollectFee(false);
    } catch (error) {
      console.error('Error during admission:', error);
      alert('Failed to admit student.');
    }
  };

  return (
    <div className="new-admission-container">
      <h2>New {student} Admission</h2>
      <form onSubmit={handleSubmit} className="admission-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="collectFee"
            checked={collectFee}
            onChange={(e) => setCollectFee(e.target.checked)}
          />
          <label htmlFor="collectFee">Collect Admission Fee Now?</label>
        </div>

        <button type="submit" className="submit-button">Admit {student}</button>
      </form>
    </div>
  );
};

export default NewAdmission;



