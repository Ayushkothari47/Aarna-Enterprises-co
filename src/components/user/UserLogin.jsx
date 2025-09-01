// UserLogin.js
import React from "react";

function UserLogin() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Username"
        className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-4 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400">
        Login
      </button>
    </div>
  );
}

export default UserLogin;
