// TourPackagePLP.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/user/userHome.css';
import kedarnath from '../assets/kedarnath.png';  // Ensure this path is correct
import charDham from '../assets/4Dham.png'
import doDham from '../assets/2Dham.webp'
import badrinath from '../assets/badrinath.png'
import musoorie from '../assets/musoorie.jpg'
import adventure from '../assets/adventure.jpg'


const TourPackagePLP = () => {
  const tourPackages = [
    {
      id: 1,
      name: 'Char Dham Yatra',
      image: charDham,
      description: 'Embark on the sacred journey of Char Dham – where devotion meets divinity',
    },
    {
      id: 2,
      name: 'Do Dham Yatra',
      image: doDham,
      description: 'Two sacred shrines, one divine experience – Do Dham Yatra',
    },
    {
      id: 3,
      name: 'Kedarnath Dham Yatra',
      image: kedarnath,
      description: 'Seek Lord Shiva’s blessings in the lap of snow-clad peaks',
    },
    {
      id: 4,
      name: 'Badrinath Dham Yatra',
      image: badrinath,
      description: 'Experience serenity, spirituality, and the blessings of Lord Badri Vishal',
    },
    {
      id: 5,
      name: 'Musoorie Tour',
      image: musoorie,
      description: 'Mussoorie – where clouds come down to meet you',
    },
    {
      id: 6,
      name: 'Adventure Package',
      image: adventure,
      description: 'From mountains to rivers, experience the wild side of travel',
    },
  ];

  return (
    <div className="tour-package-plp">
      <h2 className="plp-title">Popular Tour Packages</h2>
      <div className="tour-package-cards">
        {tourPackages.map((tour) => (
          <Link to={`/tour/${tour.id}`} key={tour.id} className="tour-card-link">
            <div className="tour-card">
              <img src={tour.image} alt={tour.name} className="tour-card-img" />
              <div className="tour-card-content">
                <h3 className="tour-card-title">{tour.name}</h3>
                <p className="tour-card-description">{tour.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TourPackagePLP;
