import React, { useState } from "react";
import trivaniGhat from "../assets/triveniGhat.webp";
import munsiyari from "../assets/Munsiyari.jpg";
import haridwar from "../assets/haridwar.jpg";
import surkanda from "../assets/surkanda.webp";
import nanital from "../assets/nanital.jpg";
import auli from "../assets/auli.webp";
import hemkund from "../assets/hemkund.webp";
import gangotri from "../assets/gangotri.jpg";
import kanchiDham from "../assets/neemKaroli.png";

const Suggestions = ({ setDropLocation, scrollToBookingForm }) => {
  const routes = [
    { id: 1, name: "Triveni Ghaat", image: trivaniGhat, description: "Witness spirituality in motion at the holy Triveni Ghat" },
    { id: 2, name: "Munsiyari", image: munsiyari, description: "Discover serenity and adventure in the lap of the Himalayas" },
    { id: 3, name: "Haridwar", image: haridwar, description: "Experience the sacred rituals and spiritual vibes of Haridwar" },
    { id: 4, name: "Surkanda", image: surkanda, description: "A trek to the skies, a prayer to the heart" },
    { id: 5, name: "Nainital", image: nanital, description: "Discover serenity, boating, and hilltop charm in Nainital" },
    { id: 6, name: "Auli", image: auli, description: "Ski, trek, and soak in the breathtaking views of Auli" },
    { id: 7, name: "Hemkund Sahib", image: hemkund, description: "A sacred journey to the high-altitude abode of faith" },
    { id: 8, name: "Gangotri", image: gangotri, description: "Step into spirituality at the source of the holy Ganga" },
    { id: 9, name: "Kanchi Dham", image: kanchiDham, description: "Seek blessings and serenity at Kanchi Dham." },
  ];

  const [shownRoutesCount, setShownRoutesCount] = useState(6);

  const loadMoreRoutes = () => {
    setShownRoutesCount((prevCount) => prevCount + 6);
  };

  const handleBookRide = (destination) => {
    setDropLocation(destination);
    if (scrollToBookingForm) scrollToBookingForm();
  };

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-8">
        Popular Tour Suggestions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12">
        {routes.slice(0, shownRoutesCount).map((route) => (
          <div
            key={route.id}
            className="bg-gray-800 text-yellow-400 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <img
              src={route.image}
              alt={route.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h3 className="text-lg font-semibold mb-2">{route.name}</h3>
                <p className="text-white text-sm mb-3">{route.description}</p>
              </div>

              <button
                className="mt-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-200 cursor-pointer"
                onClick={() => handleBookRide(route.name)}
              >
                Book Ride
              </button>
            </div>
          </div>
        ))}
      </div>

      {shownRoutesCount < routes.length && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
            onClick={loadMoreRoutes}
          >
            VIEW MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
