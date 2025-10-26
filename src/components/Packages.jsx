import React from "react";
import kedarnath from '../assets/kedarnath.png';  // Ensure this path is correct
import charDham from '../assets/4Dham.png'
import doDham from '../assets/2Dham.webp'
import badrinath from '../assets/badrinath.png'
import musoorie from '../assets/musoorie.jpg'
import adventure from '../assets/adventure.jpg'

const tourData = [
  {
    id: 1,
    title: "Char Dham Yatra",
    description: "Embark on the sacred journey of Char Dham – where devotion meets divinity",
    image: charDham,
  },
  {
    id: 2,
    title: "Do Dham Yatra",
    description: "Two sacred shrines, one divine experience – Do Dham Yatra",
    image: doDham,
  },
  {
    id: 3,
    title: "Kedarnath Dham Yatra",
    description: "Seek Lord Shiva's blessings in the lap of snow-clad peaks",
    image: kedarnath,
  },
  {
    id: 4,
    title: "Badrinath Dham Yatra",
    description: "Experience serenity, spirituality, and the blessings of Lord Badri Vishal",
    image: badrinath,
  },
  {
    id: 5,
    title: "Mussoorie Tour",
    description: "Mussoorie – where clouds come down to meet you",
    image: musoorie,
  },
  {
    id: 6,
    title: "Adventure Package",
    description: "From mountains to rivers, experience the wild side of travel",
    image: adventure,
  },
];

const Packages = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-8">
        Popular Tour Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12">
        {tourData.map((tour, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
              <p className="text-gray-700 text-sm">{tour.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
