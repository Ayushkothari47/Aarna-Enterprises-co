import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import UserHome from "./components/user/UserHome";
import rishikeshImage from './assets/rishikesh.png';
import badrinathImage from './assets/kedarnath.png';
import musoorieImage from './assets/musoorie.jpg';
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

// Hero Section Component
function HeroSection() {
  const images = [rishikeshImage, badrinathImage, musoorieImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-[60vh] text-center text-white"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 pt-32 pb-16">
        <h1 className="text-3xl font-semibold">
          Explore <span className="text-5xl">"THE <span className="text-yellow-500">WORLD</span>"</span> Together
        </h1>
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

// Main App Component with Router
function App() {
  return (
    <Router>
      <div className="bg-gray-100 text-gray-900 overflow-hidden">
        {/* Navbar */}
        <NavBar />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <section id="tours" className="bg-black">
                  <UserHome />
                </section>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserHome />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
