import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const BookPackage = () => {
  const location = useLocation();
  const packageData = location.state?.package;

  if (!packageData) {
    return (
      <p className="text-center text-red-400 py-20">
        No package selected
      </p>
    );
  }

  // ✅ Hooks outside conditions
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Build images array (skip duplicates)
  const images = [
    packageData.thumbnail_url,
    packageData.img2,
    packageData.img3,
  ]
    .filter((url, index, self) => url && self.indexOf(url) === index)
    .map((url, idx) => ({
      id: idx,
      src: url,
      alt: `${packageData.packageName || packageData.title} - Image ${idx + 1}`,
    }));


  const packageDetails = {
    title: packageData.packageName || packageData.title,
    price: packageData.price,
    description: packageData.packageDescription || packageData.description,
  };

  const handleCarouselChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Section - Image Carousel */}
        <div className="flex flex-col items-center">
          {images.length > 0 ? (
            <>
              {/* Main Image */}
              <div className="w-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src={images[currentImage].src}
                  alt={images[currentImage].alt}
                  className="w-full h-96 object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => handleCarouselChange(index)}
                    className={`w-20 h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentImage === index
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
            </>
          ) : (
            // ✅ Fallback if no images are available
            <div className="text-gray-400 text-center py-20">
              No images available for this package
            </div>
          )}
        </div>


        {/* Right Section - Details & Form */}
        <div className="flex flex-col justify-center bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">
              {packageDetails.title}
            </h2>
            <p className="text-yellow-200 font-semibold text-lg md:text-xl animate-pulse drop-shadow-[0_0_10px_#facc15]">
              Only @ {packageDetails.price}
            </p>
          </div>




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

      {/* Package Description Section */}
      <div className="w-full max-w-6xl mt-12">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-700">
          <h3 className="text-xl sm:text-1xl font-semibold text-gray-400 mb-4 text-center sm:text-left">
            Description
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg text-center sm:text-left">
            {packageDetails.description}
          </p>
        </div>
      </div>

    </div>
  );
};

export default BookPackage;
