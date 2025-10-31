import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Team from "../Icons/team.jpg";
import Ayush from "../Icons/ak.jpg";
import Anup from "../Icons/team.jpg";

const developers = [
  {
    name: "Ayush Kothari",
    role: "Backend Developer",
    img: Ayush,
    github: "https://github.com/ayush",
    linkedin: "https://www.linkedin.com/in/ayush-kothari-522958290/",
    instagram: "https://instagram.com/ayushkotharii47",
  },
  {
    name: "Anup Mondal",
    role: "Frontend Developer",
    img: Anup,
    github: "https://github.com/anup",
    linkedin: "https://www.linkedin.com/in/anup/",
    instagram: "https://instagram.com/anup",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Card */}
      <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-2xl text-center max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-400">
          About Us
        </h1>
        <p className="text-base sm:text-lg mb-8 text-gray-300">
          We are a passionate team dedicated to making your travel dreams come
          true! Our mission is to help you explore new destinations, discover
          hidden gems, and enjoy unforgettable experiences with ease and comfort.
        </p>

        {/* Owner Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-10">
          <img
            src={Team}
            alt="Team"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
          <p className="text-lg sm:text-xl font-semibold text-yellow-400">
            Aashish Uniyal - Owner
          </p>
        </div>

        {/* Developers Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6">
          Our Developers
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-6 sm:space-y-0">
          {developers.map((dev) => (
            <div
              key={dev.name}
              className="bg-gray-700 rounded-xl p-6 w-64 flex flex-col items-center shadow-lg hover:shadow-yellow-400/40 transition-shadow"
            >
              <img
                src={dev.img}
                alt={dev.name}
                className="w-28 h-28 rounded-full border-4 border-yellow-400 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-yellow-300 mb-1">
                {dev.name}
              </h3>
              <p className="text-gray-300 text-sm mb-3">{dev.role}</p>
              <div className="flex space-x-4 text-xl">
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={dev.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm sm:text-base text-gray-400 text-center">
        <p>Made By Ayush & Anup</p>
      </footer>
    </div>
  );
};

export default About;
