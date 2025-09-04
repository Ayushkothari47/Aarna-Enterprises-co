import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-yellow-500 p-6 rounded-lg shadow-xl text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>
        <p className="text-lg mb-6 text-gray-800">
          We are a passionate team dedicated to creating amazing experiences! Our mission is to make your life easier and more enjoyable with beautiful and functional designs. 
        </p>
        <div className="flex justify-center items-center space-x-4">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Team" 
            className="rounded-full border-4 border-white shadow-md"
          />
          <p className="text-lg font-semibold text-gray-800">Our Team</p>
        </div>
      </div>

      <footer className="mt-12 text-sm text-gray-400">
        <p>Made with ❤️ using React & TailwindCSS</p>
      </footer>
    </div>
  );
};

export default About;
