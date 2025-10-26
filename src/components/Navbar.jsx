import React, { useState } from "react";
import { Link } from "react-router-dom";
import planeIcon from "../assets/plane.png";
import trainIcon from "../assets/train.png";
import taxiIcon from "../assets/taxi.png";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("taxi"); // default active tab
  const [passengers, setPassengers] = useState(1); // Default to 1 passenger

  const handleDecrement = () => {
    if (passengers > 1) setPassengers(passengers - 1);
  };

  const handleIncrement = () => setPassengers(passengers + 1);

  return (
    <div>
      <header className="top-0 flex justify-between items-center p-6 bg-gray-800 opacity-90 shadow-lg z-50">
        {/* ✅ Brand (fixed Link tag) */}
        <div className="text-2xl font-bold text-white">
          <Link to="/" className="flex items-center space-x-1">
            <span>AARNA</span>
            <span
              className="text-yellow-500"
              style={{ fontFamily: "cursive" }}
            >
              ENTERPRISES
            </span>
          </Link>
        </div>

        {/* Center: Tabs */}
        <nav className="flex items-center space-x-6 md:mr-25">
          {/* Taxi Tab */}
          <span className="text-sm text-white flex items-center group transition-all duration-300">
            <button
              onClick={() => setActiveTab("taxi")}
              className="flex items-center justify-center transition-all duration-300 transform focus:outline-none"
            >
              <img src={taxiIcon} alt="Cab Book" className="w-6 h-6" />
              <span
                className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                  activeTab === "taxi"
                    ? "text-yellow-300 opacity-100 max-w-[100px]"
                    : "opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]"
                }`}
              >
                | TAXI
              </span>
            </button>
          </span>

          {/* Airport Tab */}
          <span className="text-sm text-white flex items-center group transition-all duration-300">
            <button
              onClick={() => setActiveTab("airport")}
              className="flex items-center justify-center transition-all duration-300 transform focus:outline-none"
            >
              <img src={planeIcon} alt="Airport" className="w-6 h-6" />
              <span
                className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                  activeTab === "airport"
                    ? "text-yellow-300 opacity-100 max-w-[100px]"
                    : "opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]"
                }`}
              >
                | AIRPORT
              </span>
            </button>
          </span>

          {/* Station Tab */}
          <span className="text-sm text-white flex items-center group transition-all duration-300">
            <button
              onClick={() => setActiveTab("station")}
              className="flex items-center justify-center transition-all duration-300 transform focus:outline-none"
            >
              <img src={trainIcon} alt="Station" className="w-6 h-6" />
              <span
                className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                  activeTab === "station"
                    ? "text-yellow-300 opacity-100 max-w-[100px]"
                    : "opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]"
                }`}
              >
                | STATION
              </span>
            </button>
          </span>
        </nav>

        {/* Right side: Other links */}
        <nav className="flex items-center space-x-4 text-white text-sm">
          <Link
            to="/gallery"
            className="py-2 rounded-md hover:text-yellow-300 transition-colors cursor-pointer"
          >
            Gallery
          </Link>
          <span className="text-gray-400 select-none">|</span>
          <Link
            to="/about"
            className="py-2 rounded-md hover:text-yellow-300 transition-colors cursor-pointer"
          >
            About Us
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
