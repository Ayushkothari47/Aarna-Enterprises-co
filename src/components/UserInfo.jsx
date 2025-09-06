import React, { useState } from 'react';

const UserInfo = ({ isOpen, closeModal }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User Info Submitted: \nName: ${name}\nContact: ${contact}\nEmail: ${email}`);
    closeModal(); // Close modal after submission
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">We will reach you out, kindly fill your info below</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-sm mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <label className="text-sm mb-2">Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <label className="text-sm mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button type="submit" className="bg-green-500 text-white py-2 rounded-md mb-4 hover:bg-green-600 focus:outline-none">
            Submit
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
