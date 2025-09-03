// Login.js
import React from "react";

function Login() {
  return (
    <div className="max-w-md mx-auto bg-black p-8 rounded-lg shadow-lg">
      <input
  type="text"
  placeholder="Username"
  className="
    w-full 
    p-3 
    mb-4 
    bg-transparent 
    border-b-1 border-yellow-400 
    text-white
    placeholder-white/50 
    focus:outline-none 
    focus:border-yellow-500 
    transition-all duration-300
    hover:border-yellow-300
  "
/>

<input
  type="password"
  placeholder="Password"
  className="
    w-full 
    p-3 
    mb-6 
    bg-transparent 
    border-b-1 border-yellow-400 
    text-white
    placeholder-white/50 
    focus:outline-none 
    focus:border-yellow-500 
    transition-all duration-300
    hover:border-yellow-300
  "
/>

      <button className="w-full py-3 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-400">
        Login
      </button>
    </div>
  );
}

export default Login;
