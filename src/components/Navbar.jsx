import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import planeIcon from "../assets/plane.png";
import trainIcon from "../assets/train.png";
import taxiIcon from "../assets/taxi.png";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(""); // default hidden
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reusable Booking Form
  const BookingForm = ({ title, color }) => (
    <form className="bg-black p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold text-yellow-400 text-center mb-2">
        {title}
      </h3>

      {/* Ride Details */}
      <input
        type="text"
        placeholder="Pickup Location"
        className="w-full border p-2 rounded border-white text-white  "
      />
      <input
        type="text"
        placeholder="Destination"
        className="w-full border p-2 rounded border-white text-white  "
      />

      <div className="flex space-x-2">
        <input
          type="date"
          className="w-1/2 border p-2 rounded text-gray-600  [filter:invert(1)] [cursor:pointer]"
        />
        <input
          type="time"
          className="w-1/2 border p-2 rounded text-gray-600  [filter:invert(1)] [cursor:pointer]"
        />
      </div>

      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Total Passengers"
          className="w-1/2 border p-2 rounded border-white text-white  "
          min="1"
        />
        <select className="w-1/2 border p-2 rounded border-white text-gray-400  ">
          <option value="">Trip Type</option>
          <option value="one-way">One Way</option>
          <option value="round">Round Trip</option>
        </select>
      </div>

      <select className="w-full border p-2 rounded border-white text-gray-400 ">
        <option value="">Select Car Type</option>
        <option value="sedan">Sedan</option>
        <option value="suv">SUV</option>
        <option value="hatchback">Hatchback</option>
        <option value="luxury">Luxury</option>
      </select>

      {/* User Details */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded border-white text-white  "
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-2 rounded border-white text-white  "
      />
      <input
        type="tel"
        placeholder="Contact Number"
        className="w-full border p-2 rounded border-white text-white  "
      />

      <button
        type="submit"
        className={`w-full ${color} text-black font-bold py-2 rounded hover:opacity-90 transition`}
      >
        Submit Booking
      </button>
    </form>
  );

  // Different forms for each tab
  const renderForm = () => {
    switch (activeTab) {
      case "taxi":
        return <BookingForm title="Book a Taxi" color="bg-yellow-400" />;
      case "airport":
        return <BookingForm title="Book Airport Ride" color="bg-yellow-400" />;
      case "station":
        return <BookingForm title="Book Station Ride" color="bg-yellow-400" />;
      default:
        return null;
    }
  };

  // Close modal when clicking outside
  const handleCloseModal = (e) => {
    if (e.target.id === "modalOverlay") {
      setActiveTab("");
    }
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <header className="fixed top-0 w-full z-50 bg-gray-800 bg-opacity-90 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
          {/* Brand */}
          <div className="text-2xl font-bold text-white flex items-center space-x-1">
            <Link to="/" className="flex items-center">
              <span>AARNA</span>
              <span className="text-yellow-500"> ENTERPRISES</span>
            </Link>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { name: "taxi", icon: taxiIcon, label: "TAXI" },
              { name: "airport", icon: planeIcon, label: "AIRPORT" },
              { name: "station", icon: trainIcon, label: "STATION" },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() =>
                  setActiveTab(activeTab === tab.name ? "" : tab.name)
                }
                className="flex items-center text-white text-sm transition-all duration-300 group"
              >
                <img src={tab.icon} alt={tab.label} className="w-6 h-6" />
                <span
                  className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.name
                      ? "text-yellow-300 opacity-100 max-w-[100px]"
                      : "opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]"
                  }`}
                >
                  | {tab.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Links Desktop */}
          <nav className="hidden md:flex items-center space-x-4 text-white text-sm">
            <Link to="/gallery" className="hover:text-yellow-300 transition">
              Gallery
            </Link>
            <span className="text-gray-400 select-none">|</span>
            <Link to="/about" className="hover:text-yellow-300 transition">
              About Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden bg-gray-900 bg-opacity-95 w-full overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 px-4">
            {[
              { name: "taxi", icon: taxiIcon, label: "TAXI" },
              { name: "airport", icon: planeIcon, label: "AIRPORT" },
              { name: "station", icon: trainIcon, label: "STATION" },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() =>
                  setActiveTab(activeTab === tab.name ? "" : tab.name)
                }
                className={`flex items-center text-white text-sm transition-all duration-300 group ${
                  activeTab === tab.name ? "text-yellow-300" : ""
                }`}
              >
                <img src={tab.icon} alt={tab.label} className="w-6 h-6" />
                <span className="ml-2">| {tab.label}</span>
              </button>
            ))}

            <Link to="/gallery" className="text-white py-2 hover:text-yellow-300">
              Gallery
            </Link>
            <Link to="/about" className="text-white py-2 hover:text-yellow-300">
              About Us
            </Link>
          </div>
        </div>
      </header>

      {/* Padding below header */}
      <div className="h-16 md:h-20" />

      {/* ===== Popup Modal ===== */}
      {activeTab && (
        <div
          id="modalOverlay"
          onClick={handleCloseModal}
          className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 pt-24 transition-all duration-300"
        >
          <div className="relative w-full max-w-md mx-auto animate-[slideDown_0.3s_ease]">
            {/* Close Button */}
            <button
              onClick={() => setActiveTab("")}
              className="absolute top-2 right-2 text-white hover:text-yellow-400 text-2xl font-bold"
            >
              ×
            </button>

            {renderForm()}
          </div>
        </div>
      )}

      {/* Slide down animation */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
