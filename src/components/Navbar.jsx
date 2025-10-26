import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import planeIcon from "../assets/plane.png";
import trainIcon from "../assets/train.png";
import taxiIcon from "../assets/taxi.png";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("taxi");
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

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-gray-800 bg-opacity-90 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
          {/* Brand */}
          <div className="text-2xl font-bold text-white flex items-center space-x-1">
            <Link to="/" className="flex items-center">
              <span>AARNA</span>
              <span className="text-yellow-500" style={{ fontFamily: "cursive" }}>
                ENTERPRISES
              </span>
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
                onClick={() => setActiveTab(tab.name)}
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
            <Link
              to="/gallery"
              className="py-2 rounded-md hover:text-yellow-300 transition-colors"
            >
              Gallery
            </Link>
            <span className="text-gray-400 select-none">|</span>
            <Link
              to="/about"
              className="py-2 rounded-md hover:text-yellow-300 transition-colors"
            >
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
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center text-white text-sm transition-all duration-300 group ${
                  activeTab === tab.name ? "text-yellow-300" : ""
                }`}
              >
                <img src={tab.icon} alt={tab.label} className="w-6 h-6" />
                <span className="ml-2">| {tab.label}</span>
              </button>
            ))}

            <Link
              to="/gallery"
              className="text-white py-2 rounded-md hover:text-yellow-300 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-white py-2 rounded-md hover:text-yellow-300 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </header>

      {/* Padding to prevent hidden content under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
