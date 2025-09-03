import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../assets/home.png';
import galleryIcon from '../assets/gallery.png';
import taxiIcon from '../assets/taxi.png';
import Login from '../components/admin/Login'; // assuming Login component is in same folder

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Function to open Login modal
  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  // Function to close Login modal
  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div>
      <header className="top-0 flex justify-between items-center p-6 bg-black opacity-90 shadow-lg z-50">
        {/* Left side: Logo/Brand */}
        <div className="text-2xl font-bold text-white">
          AARNA{' '}
          <span className="text-yellow-500" style={{ fontFamily: 'cursive' }}>
            ENTERPRISES
          </span>
        </div>

        {/* Center: Logo Links */}
        <nav className="flex items-center space-x-6 md:mr-25">
          <Link
            to="/home"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-yellow-300 transition-all"
          >
            <img src={homeIcon} alt="Home" className="w-6 h-6" />
          </Link>
          <Link
            to="/taxi"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-yellow-300 transition-all"
          >
            <img src={taxiIcon} alt="Taxi" className="w-6 h-6" />
          </Link>
          <Link
            to="/gallery"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-yellow-300 transition-all"
          >
            <img src={galleryIcon} alt="Gallery" className="w-6 h-6" />
          </Link>
        </nav>

        {/* Right side: Login Button */}
        <button
          onClick={openLoginModal}
          className="bg-white font-semibold text-black px-6 py-2 hover:bg-yellow-300 rounded-lg shadow-md"
        >
          LOGIN
        </button>
      </header>

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
    </div>
  );
};

export default NavBar;
