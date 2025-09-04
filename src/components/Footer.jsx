import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';

const Footer = () => {
  // Placeholder for the Google Rating
  const googleRating = '5.0'; // Example rating

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-400">&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i} className="text-gray-400">&#9733;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-10 text-center md:text-left">

        {/* Brand Info */}
        <div className="md:flex-1 flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          <span className="text-white">Aarna</span> Enterprises</h2>
          <p className="text-gray-400">
            Bhalla Farm no: 10,
            Shyampur, Rishikesh
            Uttarakhand, 249204, India
          </p>

          <p className="mt-3 text-gray-400 flex items-center gap-2">
            <MdEmail className="text-yellow-400 text-lg" />
            <a href="mailto:aarnaenterprises2024@gmail.com" className="hover:text-yellow-300 transition-colors">
              aarnaenterprises2024@gmail.com
            </a>
          </p>

          <p className="mt-3 text-gray-400 flex items-start gap-2">
            <MdPhone className="text-yellow-400 text-lg mt-1" />
            <div className="flex flex-col">
              <a href="tel:+91 9717598168" className="hover:text-yellow-300 transition-colors">
                +91 9717598168
              </a>
              <a href="tel:+91 8851622107" className="hover:text-yellow-300 transition-colors">
                +91 8851622107
              </a>
            </div>
          </p>


        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-auto border-l border-gray-600 mx-4"></div>

        {/* Navigation Links */}
        <div className="md:flex-1 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/cabBooking" className="hover:text-yellow-400">Book a Cab</a></li>
            <li><a href="/airportBooking" className="hover:text-yellow-400">Airport Service</a></li>
            <li><a href="/stationBooking" className="hover:text-yellow-400">Station Service</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
          </ul>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-auto border-l border-gray-600 mx-4"></div>

        {/* Social Media */}
        <div className="md:flex-1 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-400 text-xl">
            <a href="#" className="hover:text-yellow-400" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-400" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-400" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-auto border-l border-gray-600 mx-4"></div>

        {/* Google Rating */}
        <div className="md:flex-1 flex flex-col justify-start text-center md:text-left mt-6 md:mt-0">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Google Rating</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 text-xl">
            {renderStars(googleRating)} {/* Render the stars based on the googleRating */}
            <span className="text-yellow-300">{googleRating}</span> {/* Display the rating value */}
          </div>
        </div>

      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-700 my-8 w-11/12 mx-auto"></div>

      {/* Copyright */}
      <div className="text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Aarna Enterprises. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
