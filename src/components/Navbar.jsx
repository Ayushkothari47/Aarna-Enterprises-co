import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import planeIcon from "../assets/plane.png";
import trainIcon from "../assets/train.png";
import taxiIcon from "../assets/taxi.png";
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(""); // default hidden
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
  if (activeTab) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // Cleanup on unmount
  return () => {
    document.body.style.overflow = "";
  };
}, [activeTab]);

  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    totalPassengers: 1,
    tripType: "",
    carType: "",
    userName: "",
    userEmail: "",
    userContact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Reusable Booking Form
  const BookingForm = ({ title, color }) => {
    const [formData, setFormData] = useState({
      pickup: "",
      destination: "",
      date: "",
      time: "",
      totalPassengers: "",
      tripType: "",
      carType: "",
      userName: "",
      userEmail: "",
      userContact: "",
    });

    const handleInput = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setActiveTab("");
      setSuccessMessage("");
      setErrorMessage("");

      try {
        const res = await api.post(
          "/booking/bookRide",
          formData, // data sent directly
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check response status (optional)
        if (res.status !== 200) {
          toast.error(res.data.message || "Failed to submit booking")
          // throw new Error(res.data.message || "Failed to submit booking");
        }

        // Clear form
        setFormData({
          pickup: "",
          destination: "",
          date: "",
          time: "",
          totalPassengers: 1,
          tripType: "",
          carType: "",
          userName: "",
          userEmail: "",
          userContact: "",
        });

        toast.success("Booking Successful")

      } catch (error) {
        toast.error("Error submitting booking:", error)

        if (error.response) {
          toast.error(error.response.data.message || "Something went wrong")
        } else {
          toast.error(error.message || "Something went wrong")
        }
      } finally {
        setIsSubmitting(false);
      }
    };



    return (
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-bold text-yellow-400 text-center mb-2">{title}</h3>

        <input
          type="text"
          name="pickup"
          value={formData.pickup}
          onChange={handleInput}
          placeholder="Pickup Location"
          className="w-full border p-2 rounded border-white text-white"
          autoComplete="off"
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleInput}
          placeholder="Destination"
          className="w-full border p-2 rounded border-white text-white"
          autoComplete="off"
        />
        <div className="flex space-x-2">
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            placeholderText="Select a date"
             className="w-1/1 border border-white p-2 rounded text-gray-400 placeholder-gray-400"
          />
          <DatePicker
            selected={formData.time}
            onChange={(time) => setFormData({ ...formData, time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Select a time"
             className="w-1/1 border border-white  p-2 rounded text-gray-400 placeholder-gray-400"
          />

        </div>

        <div className="flex space-x-2">
          <input
            type="number"
            name="totalPassengers"
            min="1"
            value={formData.totalPassengers}
            onChange={handleInput}
            placeholder="Total Passengers"
            className="w-1/2 border p-2 rounded border-white text-white"
          />
          <select
            name="tripType"
            value={formData.tripType}
            onChange={handleInput}
            className="w-1/2 border p-2 rounded border-white text-gray-400"
          >
            <option value="">Trip Type</option>
            <option value="one-way">One Way</option>
            <option value="round">Round Trip</option>
          </select>
        </div>

        <select
          name="carType"
          value={formData.carType}
          onChange={handleInput}
          className="w-full border p-2 rounded border-white text-gray-400"
        >
          <option value="">Select Car Type</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="luxury">Luxury</option>
        </select>

        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInput}
          placeholder="Full Name"
          className="w-full border p-2 rounded border-white text-white"
          autoComplete="name"
        />
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInput}
          placeholder="Email Address"
          className="w-full border p-2 rounded border-white text-white"
          autoComplete="email"
        />
        <input
          type="tel"
          name="userContact"
          value={formData.userContact}
          onChange={handleInput}
          placeholder="Contact Number"
          className="w-full border p-2 rounded border-white text-white"
          autoComplete="tel"
        />

        <button
          type="submit"
          className={`w-full ${color} text-black font-bold py-2 rounded hover:opacity-90 transition`}
        >
          Submit Booking
        </button>
      </form>
    );
  };


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

  const handleCloseModal = (e) => {
    if (e.target.id === "modalOverlay") {
      // setActiveTab("");
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
                  className={`ml-2 whitespace-nowrap transition-all duration-300 ${activeTab === tab.name
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
          className={`md:hidden bg-gray-900 bg-opacity-95 w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
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
                onClick={() => {
                  setActiveTab(activeTab === tab.name ? "" : tab.name);
                  setIsMobileMenuOpen(false);   // ← auto close
                }}
                className={`flex items-center text-white text-sm transition-all duration-300 group ${activeTab === tab.name ? "text-yellow-300" : ""}`}
              >

                <img src={tab.icon} alt={tab.label} className="w-6 h-6" />
                <span className="ml-2">| {tab.label}</span>
              </button>
            ))}

            <Link
              to="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}  // ← auto close
              className="text-white py-2 hover:text-yellow-300"
            >

              Gallery
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white py-2 hover:text-yellow-300"
            >

              About Us
            </Link>
          </div>
        </div>
      </header>

      {/* Padding below header */}
      <div className="h-16 md:h-20" />

      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
          <div className="loader border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-6"></div>
          <p className="text-white text-xl font-semibold tracking-wide">
            Submitting...
          </p>
        </div>
      )}


      {/* ===== Popup Modal ===== */}
      {activeTab && (
        <div
          id="modalOverlay"
          onClick={handleCloseModal}
          className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 pt-24 transition-all duration-300"
        >
          <div className="relative w-full max-w-md mx-auto animate-[slideDown_0.3s_ease]">
            <button
              onClick={() => setActiveTab("")}
              className="absolute top-2 right-2 text-white hover:text-yellow-400 text-2xl font-bold"
            >
              ×
            </button>

            {/* Mount BookingForm once and control title/color dynamically */}
            <BookingForm
              title={
                activeTab === "taxi"
                  ? "Book a Taxi"
                  : activeTab === "airport"
                    ? "Book Airport Ride"
                    : "Book Station Ride"
              }
              color="bg-yellow-400"
            />
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
