import React, { useState, useEffect } from "react";
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';

const Desktop_fetchAllBanner = "/siteContent/fetchAllBanner";
const Mobile_fetchAllBanner = "/siteContent/fetchAllMobileBanner";

function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hideBanner, setHideBanner] = useState(false);

  // ✔ Detect device (mobile vs desktop)
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const endpoint = isMobile ? Mobile_fetchAllBanner : Desktop_fetchAllBanner;

        const response = await api.get(endpoint);
        const result = response.data;

        if (result.message === "No visible banners found.") {
          setHideBanner(true);
        } else if (result.data && result.data.length > 0) {
          setBanners(result.data[0].banners);
        }
      } catch (error) {
        toast.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [isMobile]);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  const Spinner = () => (
    <div className="loader border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-4"></div>
  );

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

  if (hideBanner || banners.length === 0) {
    return null;
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

      {/* Dots */}
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
