import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const BookPackage = () => {
  const location = useLocation();
  const packageData = location.state?.package;
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!packageData) {
    return (
      <p className="text-center text-red-400 py-20">No package selected</p>
    );
  }

  const [currentImage, setCurrentImage] = useState(0);

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

  const [formData, setFormData] = useState({
    pickup: "",
    date: "",
    time: "",
    totalPassengers: 1,
    userName: "",
    userEmail: "",
    userContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      bookingId: packageData.packageId, // assuming packageData has _id
      ...formData,
    };

    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/booking/bookPackage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      setIsSubmitting(false);

      const result = await response.json();
      if (response.ok) {
        alert("Booking successful!");
        console.log(result);
      } else {
        alert(result.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
  {/* Centered container for top section */}
  <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Left Section - Carousel */}
    <div className="flex flex-col items-center">
      {images.length > 0 ? (
        <>
          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            <img
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="w-full h-96 object-cover transition-all duration-500"
            />
          </div>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            {images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setCurrentImage(index)}
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
        </>
      ) : (
        <div className="text-gray-400 text-center py-20">
          No images available for this package
        </div>
      )}
    </div>

    {/* Right Section - Form */}
    <div className="flex flex-col justify-center bg-gray-800 rounded-xl p-8 shadow-lg w-full">
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">
          {packageDetails.title}
        </h2>
        <p className="text-yellow-200 font-semibold text-lg md:text-xl animate-pulse drop-shadow-[0_0_10px_#facc15]">
          Only @ {packageDetails.price}
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* First Row: Full Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            required
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Email Address"
            required
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Second Row: Phone + Pickup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="userContact"
            placeholder="Phone Number"
            required
            value={formData.userContact}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
          <input
            type="text"
            name="pickup"
            placeholder="Pickup Location"
            required
            value={formData.pickup}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Third Row: Date + Time + Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
          <input
            type="number"
            name="totalPassengers"
            min={1}
            required
            value={formData.totalPassengers}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-200"
        >
          Send Enquiry
        </button>
      </form>
    </div>
  </div>

  {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
          <div className="loader border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-6"></div>
          <p className="text-white text-xl font-semibold tracking-wide">
            Submitting...
          </p>
        </div>
      )}

  {/* Package Description */}
  <div className="w-full max-w-7xl mx-auto mt-12">
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-700">
      <h3 className="text-xl sm:text-1xl font-semibold text-yellow-400 mb-4 text-center sm:text-left">
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
