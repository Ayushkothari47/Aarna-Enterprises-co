import React from "react";
import Team from '../Icons/team.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Card */}
      <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-2xl text-center max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-400">
          About Us
        </h1>
        <p className="text-base sm:text-lg mb-8 text-gray-300">
        We are a passionate team dedicated to making your travel dreams come true! Our mission is to help you explore new destinations, discover hidden gems, and enjoy unforgettable experiences with ease and comfort.
        </p>

        {/* Team Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <img
            src={Team}
            alt="Team"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
          <p className="text-lg sm:text-xl font-semibold text-yellow-400">
            Our Team
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm sm:text-base text-gray-400 text-center">
        <p>Made with ❤️ using React & TailwindCSS</p>
      </footer>
    </div>
  );
};

export default About;
