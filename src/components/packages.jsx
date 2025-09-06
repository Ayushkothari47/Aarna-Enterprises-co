// TourPackagePLP.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/user/userHome.css';
import kedarnath from '../assets/kedarnath.png';  // Ensure this path is correct

const TourPackagePLP = () => {
  const tourPackages = [
    {
      id: 1,
      name: 'Char Dham Yatra',
      image: kedarnath,
      description: 'A spiritual journey through the four sacred shrines in Uttarakhand.',
    },
    {
      id: 2,
      name: 'Himachal Tour',
      image: kedarnath,
      description: 'Explore the scenic beauty of Himachal Pradesh with this amazing tour package.',
    },
    {
      id: 3,
      name: 'Goa Beaches',
      image: kedarnath,
      description: 'Relax and unwind at the beautiful beaches of Goa.',
    },
    {
      id: 4,
      name: 'Kerala Backwaters',
      image: kedarnath,
      description: 'Experience the tranquil beauty of Kerala’s backwaters.',
    },
    {
      id: 5,
      name: 'Andaman Islands',
      image: kedarnath,
      description: 'A tropical paradise with stunning beaches and coral reefs.',
    },
    {
      id: 6,
      name: 'Rajasthan Heritage Tour',
      image: kedarnath,
      description: 'Discover the rich history and culture of Rajasthan’s majestic forts and palaces.',
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
