import React, { useState } from 'react';
import planeIcon from '../assets/plane.png';
import trainIcon from '../assets/train.png';
import taxiIcon from '../assets/taxi.png';
import { Link } from 'react-router-dom';



const NavBar = () => {
  const [activeTab, setActiveTab] = useState('taxi'); // default active tab

  const [passengers, setPassengers] = useState(1);  // Default to 1 passenger

  // Function to handle decrement
  const handleDecrement = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  // Function to handle increment
  const handleIncrement = () => {
    setPassengers(passengers + 1);
  };



  return (
    <div>
      <header className="top-0 flex justify-between items-center p-6 bg-gray-800 opacity-90 shadow-lg z-50">
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
                className={`ml-2 whitespace-nowrap transition-all duration-300 ${activeTab === 'taxi'
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
                className={`ml-2 whitespace-nowrap transition-all duration-300 ${activeTab === 'airport'
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
                className={`ml-2 whitespace-nowrap transition-all duration-300 ${activeTab === 'station'
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
          <Link to="/about" className="py-2 rounded-md hover:text-yellow-300 transition-colors cursor-pointer">
            About Us
          </Link>
        </nav>
      </header>

      {/* Booking Form Section */}
      <section className="p-6 bg-gray-100">
        {activeTab === 'taxi' && (
          <div className="text-black">
            {/* Replace with your real taxi booking form */}
            {activeTab === 'taxi' && (

              <div className="w-full max-w-4xl mx-auto bg-gray-800 p-8 sm:p-10 lg:p-12 rounded-lg shadow-md text-white">


                <h2 className="text-2xl text-center font-bold mb-6 text-yellow-300">Taxi Booking</h2>

                <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pickup Location */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {/* Drop Location */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">
                      Drop Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter drop location"
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {/* Pickup Date & Time */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">
                      Pickup Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {/* Car Type */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">
                      Car Type
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="">Select a car type</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                    </select>
                  </div>

                  {/* No, of Passenger */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">
                      No. Of Passengers
                    </label>
                    <div className="flex items-center border border-gray-600 rounded-md">
                      {/* Decrement Button */}
                      <button
                        type="button"
                        className="w-8 h-8 bg-gray-600 text-white rounded-l-md flex items-center justify-center disabled:opacity-50"
                        onClick={handleDecrement}
                        disabled={passengers <= 1}
                      >
                        -
                      </button>

                      {/* Input to display the current number of passengers */}
                      <input
                        type="number"
                        value={passengers}
                        min="1"
                        onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value)))}
                        className="flex-grow w-full h-8 text-center bg-gray-700 text-white focus:outline-none appearance-none custom-number-input"
                      />

                      {/* Increment Button */}
                      <button
                        type="button"
                        className="w-8 h-8 bg-gray-600 text-white rounded-r-md flex items-center justify-center"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Trip Type */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">
                      Trip Type
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="One Way">One Way</option>
                      <option value="Round Trip">Round Trip</option>
                    </select>
                  </div>

                  {/* Full-width submit button — spans both columns */}
                  <div className="lg:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition duration-300"
                    >
                      Book Taxi
                    </button>
                  </div>
                </form>
              </div>

            )}

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
