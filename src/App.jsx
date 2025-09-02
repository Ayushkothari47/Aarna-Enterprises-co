import React, { useState, useEffect } from "react"; // Importing useEffect
import Login from "./components/admin/Login";
import UserHome from "./components/user/UserHome";
import UserLogin from "./components/user/UserLogin";
import homeIcon from './assets/home.png';
import galleryIcon from './assets/gallery.png';
import taxiIcon from './assets/taxi.png';
import rishikeshImage from './assets/rishikesh.png';
import badrinathImage from './assets/kedarnath.png';
import musoorieImage from './assets/musoorie.jpg';


// Hero Section Component
function HeroSection() {
  const images = [rishikeshImage, badrinathImage, musoorieImage]; // Array of images
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to keep track of the current image

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <section className="relative bg-cover bg-center h-[60vh] text-center text-white" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 pt-32 pb-16">
        <h1 className="text-3xl font-semibold">
          Explore <span className="text-5xl">"THE <span className="text-yellow-500">WORLD</span>"</span> Together
        </h1>
        {/* <p className="text-xl mt-4">Find amazing destinations and book your next adventure.</p> */}
        <a
          href="#tours"
          className="mt-15 inline-block border-5 border-yellow-500 text-yellow-400 py-4 px-7 text-xl hover:bg-yellow-400 hover:text-black"
          style={{ fontFamily: "cursive" }}
        >
          Make Enquiry
        </a>
      </div>
    </section>
  );
}

// Main App Component
function App() {
  // State for handling modal visibility
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Function to open Login modal
  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  // Function to close Login modal
  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // Function to open SignUp modal
  const openSignupModal = () => {
    setIsSignupOpen(true);
  };

  // Function to close SignUp modal
  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };

  return (
    <div className={`bg-gray-100 text-gray-900 ${isLoginOpen || isSignupOpen ? "overflow-hidden" : ""}`}>
      {/* Navbar */}
      <header className="top-0 flex justify-between items-center p-6 bg-black opacity-90 shadow-lg z-50">
        {/* Left side: AARNA ENTERPRISES */}
        <div className="text-2xl font-bold text-white">
          AARNA{" "}
          <span className="text-yellow-500" style={{ fontFamily: "cursive" }}>
            ENTERPRISES
          </span>
         
        </div>

        {/* Right side: Logo Links & Buttons */}
        <nav className="flex items-center space-x-6">
          {/* Logo Links */}
          <a href="#home" className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-yellow-300 transition-all">
            <img src={homeIcon} alt="Home" className="w-6 h-6" />
          </a>
          <a href="#taxi" className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-yellow-300 transition-all">
            <img src={taxiIcon} alt="Taxi" className="w-6 h-6" />
          </a>
          <a href="#gallery" className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-yellow-300 transition-all">
            <img src={galleryIcon} alt="Gallery" className="w-6 h-6" />
          </a>

          {/* Login and Sign Up Buttons */}
          <button onClick={openLoginModal} className="bg-white text-black px-6 py-2 hover:bg-yellow-300">LOGIN</button>
          {/* <button onClick={openSignupModal} className="bg-white text-black font-bold px-4 py-2 rounded-full hover:bg-yellow-300">Sign Up</button> */}
        </nav>
      </header>
      <HeroSection />

      <section id="tours" className="bg-black">
        <UserHome />
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>&copy; 2025 TravelX. All Rights Reserved.</p>
      </footer>



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

            <h2 className="text-3xl text-white mb-6 drop-shadow-lg">
            Admin Login
            </h2>

            <Login />

            <div className="mt-4 w-full text-center text-white font-semibold text-sm">
              Powered by <span className="italic">AARNA ENTERPRISES</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
