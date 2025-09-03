// Login.js
import React from "react";



{/* Modal for Login */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative bg-black rounded-xl shadow-2xl w-96 p-6 border-4 border-black flex flex-col items-center animate-fadeIn">
            <button
              onClick={closeLoginModal}
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-red-500 transition-colors"
            >
              ×
            </button>

            <h2 className="text-3xl text-white mb-6 drop-shadow-lg">Admin Login</h2>

            <Login />

            <div className="mt-4 w-full text-center text-white font-semibold text-sm">
              Powered by <span className="italic">AARNA ENTERPRISES</span>
            </div>
          </div>
        </div>
      )}

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
