import React, { useState, useEffect } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const getBanners = `${SERVER_URL}/CMS/fetchAllBanner`;

function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(getBanners);
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          setBanners(result.data[0].banners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  // Spinner component
  const Spinner = () => (
    <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin mb-4"></div>
  );

  // Banner container height
  const bannerHeight = "h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh]";

  if (loading) {
    return (
      <div className={`relative w-full ${bannerHeight} flex flex-col justify-center items-center bg-transparent`}>
        <Spinner />
        <p className="text-white text-xl font-semibold tracking-wide">
          Loading...
        </p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className={`w-full ${bannerHeight} flex items-center justify-center text-gray-700`}>
        No banners available
      </div>
    );
  }

  return (
    <div className={`relative w-full ${bannerHeight} overflow-hidden`}>
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`Banner ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-yellow-400" : "bg-yellow-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;
