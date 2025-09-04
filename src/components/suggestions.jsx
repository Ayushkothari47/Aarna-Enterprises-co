import React from 'react';
import '../components/user/UserHome.css';
import kedarnath from '../assets/kedarnath.png';  // Default image for testing (you can customize per route)

const TravelSuggestions = () => {
  const routes = [
    { id: 1, from: 'Delhi', to: 'Rishikesh', image: kedarnath },
    { id: 2, from: 'Rishikesh', to: 'Dehradun', image: kedarnath },
    { id: 3, from: 'Rishikesh', to: 'Kedarnath', image: kedarnath },
    { id: 4, from: 'Dehradun', to: 'Haridwar', image: kedarnath },
    { id: 5, from: 'Rishikesh', to: 'Gangotri', image: kedarnath },
    { id: 6, from: 'Dehradun', to: 'Mussoorie', image: kedarnath },
    { id: 7, from: 'Rishikesh', to: 'Yamnotri', image: kedarnath },
    { id: 8, from: 'Delhi', to: 'Lansdowne', image: kedarnath },
    { id: 9, from: 'Delhi', to: 'Nainital', image: kedarnath },
  ];

  return (
    <div className="suggestions-container">
      <h2 className="suggestions-title">Travel Suggestions</h2>
      <div className="suggestions-list">
        {routes.map((route) => (
          <div className="suggestion-card" key={route.id}>
            <img src={route.image} alt={`${route.from} to ${route.to}`} className="suggestion-img" />
            <h3 className="suggestion-title">
              {route.from} to {route.to}
            </h3>
            <p className="suggestion-description">
              Plan your trip from {route.from} to {route.to} with these amazing packages and routes.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelSuggestions;
