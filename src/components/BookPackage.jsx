import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const BookPackage = () => {
  const location = useLocation();
  const packageData = location.state?.package;

  // ✅ Handle no package case
  if (!packageData) {
    return (
      <p className="text-center text-red-400 py-20">
        No package selected
      </p>
    );
  }

  // ✅ Hooks should always be outside conditions
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { id: 0, src: packageData.image, alt: packageData.title },
  ];

  const packageDetails = {
    title: packageData.title,
    price: packageData.price,
    description: packageData.description,
  };

  const handleCarouselChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section - Image Carousel */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            <img
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="w-full h-96 object-cover transition-all duration-500"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 mt-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => handleCarouselChange(index)}
                className={`w-20 h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentImage === index
                    ? "border-yellow-400 scale-105"
                    : "border-gray-600 hover:border-yellow-300"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Details & Form */}
        <div className="flex flex-col justify-center bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">
              {packageDetails.title}
            </h2>
            <div className="text-yellow-400 font-semibold text-2xl flex items-baseline gap-1">
              <span>{packageDetails.price}</span>
              <span className="text-yellow-400 font-semibold text-lg">
                / person
              </span>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{packageDetails.description}</p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookPackage;
