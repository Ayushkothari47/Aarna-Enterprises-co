import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
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
    <footer className="bg-gray-900 text-white pt-10 sm:pt-16 pb-6 justify-center">
      <div className="max-w-6xl mx-auto px-6 
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            <span className="text-white">AARNA</span>ENTERPRISES
          </h2>

          <a
            href="https://www.google.com/maps/dir//10,+Bhalla+Farm+Rd,+Shyampur,+Rishikesh,+Uttarakhand+249204"
            target="_blank"
          >
            <p className="text-gray-400 mb-3 hover:text-yellow-400 transition-colors">
              Bhalla Farm no: 10, Shyampur, Rishikesh, Uttarakhand, 249204, India
            </p>
          </a>

          <p className="flex items-center justify-center md:justify-start text-gray-400 gap-2 mb-1">
            <MdEmail className="text-yellow-400 text-lg flex-shrink-0" />
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
              <div>
                <a href="tel:+919717598168" className="hover:text-yellow-300 transition-colors">
                  +919717598168
                </a>
              </div>
              <div>

                <a href="tel:+918851622107" className="hover:text-yellow-300 transition-colors">
                  +918851622107
                </a>
              </div>
            </span>


          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-center md:text-left lg:border-l lg:border-gray-700 lg:pl-6 ml-2">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/cabBooking" className="hover:text-yellow-400">Book a Cab</a></li>
            <li><a href="/airportBooking" className="hover:text-yellow-400">Airport Service</a></li>
            <li><a href="/stationBooking" className="hover:text-yellow-400">Station Service</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="/gallery" className="hover:text-yellow-400">Gallery</a></li>
          </ul>
        </div>


        {/* Social Media */}
        <div className="flex flex-col text-center md:text-left lg:border-l lg:border-gray-700 lg:pl-6 ml-2">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-400 text-xl">
            <a href="https://www.facebook.com/profile.php?id=61561679429891&mibextid=ZbWKwL" target="_blank" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-yellow-400"><FaYoutube /></a>
          </div>
        </div>


        {/* Google Rating */}
        <div className="flex flex-col text-center md:text-left lg:border-l lg:border-gray-700 lg:pl-6 ml-2">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Google Rating</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 text-lg">
            {renderStars(googleRating)}
            <span>{googleRating}.0</span>
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
