import React, { useState } from 'react';
import planeIcon from '../assets/plane.png';
import trainIcon from '../assets/train.png';
import taxiIcon from '../assets/taxi.png';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('taxi'); // default active tab

  return (
    <div>
      <header className="top-0 flex justify-between items-center p-6 bg-black opacity-90 shadow-lg z-50">
        {/* Brand */}
        <div className="text-2xl font-bold text-white">
          AARNA{' '}
          <span className="text-yellow-500" style={{ fontFamily: 'cursive' }}>
            ENTERPRISES
          </span>
        </div>

        {/* Center: Tabs */}
        <nav className="flex items-center space-x-6 md:mr-25">
          {/* Taxi Tab */}
          <span className="text-sm text-white flex items-center group transition-all duration-300">
            <button
              onClick={() => setActiveTab('taxi')}
              className="flex items-center justify-center transition-all duration-300 transform focus:outline-none"
            >
              <img src={taxiIcon} alt="Cab Book" className="w-6 h-6" />
            
            <span
              className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === 'taxi'
                  ? 'text-yellow-300 opacity-100 max-w-[100px]'
                  : 'opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]'
              }`}
            >
              | TAXI
            </span>
            </button>
          </span>

          {/* Airport Tab */}
          <span className="text-sm text-white flex items-center group transition-all duration-300">
            <button
              onClick={() => setActiveTab('airport')}
              className="flex items-center justify-center transition-all duration-300 transform focus:outline-none"
            >
              <img src={planeIcon} alt="Airport" className="w-6 h-6" />
            
            <span
              className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === 'airport'
                  ? 'text-yellow-300 opacity-100 max-w-[100px]'
                  : 'opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]'
              }`}
            >
              | AIRPORT
            </span>
            </button>
          </span>

          {/* Station Tab */}
          <span className="text-sm text-white flex items-center group transition-all duration-300">
            <button
              onClick={() => setActiveTab('station')}
              className="flex items-center justify-center transition-all duration-300 transform focus:outline-none"
            >
              <img src={trainIcon} alt="Station" className="w-6 h-6" />
            
            <span
              className={`ml-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === 'station'
                  ? 'text-yellow-300 opacity-100 max-w-[100px]'
                  : 'opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[100px]'
              }`}
            >
              | STATION
            </span>
            </button>
          </span>
          
        </nav>

        {/* Right side: Other links */}
        <nav className="flex items-center space-x-4 text-white text-sm">
          <span className="py-2 rounded-md hover:text-yellow-300 transition-colors cursor-pointer">
            Gallery
          </span>
          <span className="text-gray-400 select-none">|</span>
          <span className="py-2 rounded-md hover:text-yellow-300 transition-colors cursor-pointer">
            About Us
          </span>
        </nav>
      </header>

      {/* Booking Form Section */}
      <section className="p-6 bg-gray-100">
        {activeTab === 'taxi' && (
          <div className="text-black">
            {/* Replace with your real taxi booking form */}
            <h2 className="text-lg font-bold mb-2">Taxi Booking Form</h2>
            <p>Form fields for booking a taxi go here...</p>
          </div>
        )}

        {activeTab === 'airport' && (
          <div className="text-black">
            {/* Replace with your real airport booking form */}
            <h2 className="text-lg font-bold mb-2">Airport Booking Form</h2>
            <p>Form fields for airport transport go here...</p>
          </div>
        )}

        {activeTab === 'station' && (
          <div className="text-black">
            {/* Replace with your real station booking form */}
            <h2 className="text-lg font-bold mb-2">Station Booking Form</h2>
            <p>Form fields for train station drop/pickup go here...</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default NavBar;
