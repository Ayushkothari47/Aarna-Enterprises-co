import React from 'react';
import TourPackagePLP from '.././packages.jsx';  // Import TourPackagePLP component
import TravelSuggestions from '../suggestions.jsx'
import PDP from '../PDP.jsx'

const UserHome = () => {
  return (
    <div class="section-container">
      <div class="tour-package">
        <TourPackagePLP />
      </div>
      <div class="travel-suggestions">
        <TravelSuggestions />
      </div>
      <PDP />
    </div>

  );
};

export default UserHome;
