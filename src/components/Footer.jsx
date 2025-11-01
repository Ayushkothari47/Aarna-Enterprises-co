import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  const googleRating = 5; // Example rating as a number

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <footer className="bg-gray-900 text-white pt-10 sm:pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-10">

        {/* Brand Info */}
        <div className="flex-1 flex flex-col justify-start text-center md:text-left">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            <span className="text-white">Aarna</span> Enterprises
          </h2>
          <p className="text-gray-400 mb-3">
            Bhalla Farm no: 10, Shyampur, Rishikesh <br />
            Uttarakhand, 249204, India
          </p>

          <p className="flex items-center justify-center md:justify-start text-gray-400 gap-2 mb-1">
            <MdEmail className="text-yellow-400 text-lg" />
            <a
              href="mailto:aarnaenterprises2024@gmail.com"
              className="hover:text-yellow-300 transition-colors break-words"
            >
              aarnaenterprises2024@gmail.com
            </a>
          </p>

          <p className="flex flex-col md:flex-row md:items-center text-gray-400 gap-1 md:gap-4">
            <span className="flex items-center gap-2 justify-center md:justify-start">
              <MdPhone className="text-yellow-400 text-lg" />
              <a href="tel:+919717598168" className="hover:text-yellow-300 transition-colors">
                +919717598168
              </a>
            </span>
            <span className="flex items-center gap-2 justify-center md:justify-start">
              <MdPhone className="text-yellow-400 text-lg" />
              <a href="tel:+918851622107" className="hover:text-yellow-300 transition-colors">
                +918851622107
              </a>
            </span>
          </p>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block border-l border-gray-700 mx-4"></div>

        {/* Quick Links */}
        <div className="flex-1 flex flex-col justify-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              <a href="/cabBooking" className="hover:text-yellow-400 transition-colors">Book a Cab</a>
            </li>
            <li>
              <a href="/airportBooking" className="hover:text-yellow-400 transition-colors">Airport Service</a>
            </li>
            <li>
              <a href="/stationBooking" className="hover:text-yellow-400 transition-colors">Station Service</a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400 transition-colors">About Us</a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</a>
            </li>
          </ul>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block border-l border-gray-700 mx-4"></div>

        {/* Social Media */}
        <div className="flex-1 flex flex-col justify-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-400 text-xl mb-4 md:mb-0">
            <a href="#" className="hover:text-yellow-400" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block border-l border-gray-700 mx-4"></div>

        {/* Google Rating */}
        <div className="flex-1 flex flex-col justify-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Google Rating</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 text-xl">
            {renderStars(googleRating)}
            <span className="text-white ml-2">{googleRating}.0</span>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8 w-11/12 mx-auto"></div>

      {/* Copyright */}
      <div className="text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Aarna Enterprises. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
