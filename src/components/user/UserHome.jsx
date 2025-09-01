// UserHome.js
import React from "react";

function UserHome() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src="destination1.jpg" alt="Paris" className="w-full h-48 object-cover rounded-md" />
          <h3 className="mt-4 text-xl font-semibold">Paris</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src="destination2.jpg" alt="Tokyo" className="w-full h-48 object-cover rounded-md" />
          <h3 className="mt-4 text-xl font-semibold">Tokyo</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img src="destination3.jpg" alt="New York" className="w-full h-48 object-cover rounded-md" />
          <h3 className="mt-4 text-xl font-semibold">New York</h3>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
