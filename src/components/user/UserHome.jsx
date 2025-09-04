import React from 'react';
import TourPackagePLP from '.././packages.jsx';  // Import TourPackagePLP component
import TravelSuggestions from '../suggestions.jsx'

const UserHome = () => {
  return (
    <div>
      <h1>Welcome to Your Travel Dashboard!</h1>
      {/* Render the TourPackagePLP component here */}
      <TourPackagePLP />
      <TravelSuggestions />
    </div>
  );
};

export default UserHome;
