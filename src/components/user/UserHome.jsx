import React, { useState } from 'react';
import TourPackagePLP from '../packages.jsx';  
import TravelSuggestions from '../suggestions.jsx';
import PDP from '../PDP.jsx';
import NavBar from '../NavBar.jsx';  // make sure path is correct

const UserHome = ({ dropLocation, setDropLocation, scrollToBookingForm }) => {
  return (
    <div className="section-container">
      <div className="tour-package">
        <TourPackagePLP />
      </div>

      <div className="travel-suggestions">
        <TravelSuggestions 
          setDropLocation={setDropLocation} 
          scrollToBookingForm={scrollToBookingForm} 
        />
      </div>

      <PDP />
    </div>
  );
};


export default UserHome;