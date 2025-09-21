// import React, { useState } from 'react';
// import '../components/user/userHome.css';
// import trivaniGhat from '../assets/triveniGhat.webp'
// import munsiyari from '../assets/Munsiyari.jpg'
// import haridwar from '../assets/haridwar.jpg'
// import surkanda from '../assets/surkanda.webp'
// import nanital  from '../assets/nanital.jpg'
// import auli from '../assets/auli.webp'
// import hemkund from '../assets/hemkund.webp'
// import gangortri from '../assets/gangotri.jpg'
// import kanchiDham from '../assets/neemKaroli.png'


// const TravelSuggestions = () => {
//   // The initial set of routes
//   const routes = [
//     {
//       id: 1,
//       name: 'Triveni Ghaat',
//       image: trivaniGhat,
//       description: 'Witness spirituality in motion at the holy Triveni Ghat'
//     },

//     { id: 2,
//       name: 'Munsiyari',
//       image: munsiyari,
//       description: 'Discover serenity and adventure in the lap of the Himalayas'
//      },

//     { id: 3,
//       name: 'Haridwar',
//       image: haridwar,
//       description: 'Experience the sacred rituals and spiritual vibes of Haridwar'
//     },

//     {id: 4,
//       name: 'Surkanda',
//       image: surkanda,
//       description: 'A trek to the skies, a prayer to the heart'
//     },

//     {id: 5,
//       name: 'Nanital',
//       image: nanital,
//       description: 'Discover serenity, boating, and hilltop charm in Nainital' 
//      },

//     {id: 6,
//       name: 'Auli',
//       image: auli,
//       description: 'Ski, trek, and soak in the breathtaking views of Auli'
//      },

//     {id: 7,
//       name: 'Hemkund Sahib',
//       image: hemkund,
//       description: 'A sacred journey to the high-altitude abode of faithy' 
//      },

//     {id: 8,
//       name: 'Gangotri',
//       image: gangortri,
//       description: 'Step into spirituality at the source of the holy Ganga'  
//     },

//     {id: 9,
//       name: 'Kanchi Dham',
//       image: kanchiDham,
//       description: 'Seek blessings and serenity at Kanchidham Dham.' 
//     },
//   ];

//   // State to control how many routes are shown
//   const [shownRoutesCount, setShownRoutesCount] = useState(6);

//   // Function to handle "LOAD MORE" button click
//   const loadMoreRoutes = () => {
//     setShownRoutesCount(prevCount => prevCount + 6); // Increase by 6 each time
//   };

//   return (
//     <div className="suggestions-container">
//       <h2 className="suggestions-title">Travel Suggestions</h2>
//       <div className="suggestions-list">
//         {routes.slice(0, shownRoutesCount).map((route) => (
//           <div className="suggestion-card" key={route.id}>
//             <img src={route.image} alt={`${route.from} to ${route.to}`} className="suggestion-img" />
//             <h3 className="suggestion-title">
//               {route.name}
//             </h3>
//             <p className="suggestion-description">
//               {route.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Conditionally show the LOAD MORE button */}
//       {shownRoutesCount < routes.length && (
//         <div className="load-more-container">
//           <button className="load-more-btn" onClick={loadMoreRoutes}>LOAD MORE</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TravelSuggestions;



import React, { useState } from 'react';
import '../components/user/userHome.css';
import trivaniGhat from '../assets/triveniGhat.webp';
import munsiyari from '../assets/Munsiyari.jpg';
import haridwar from '../assets/haridwar.jpg';
import surkanda from '../assets/surkanda.webp';
import nanital from '../assets/nanital.jpg';
import auli from '../assets/auli.webp';
import hemkund from '../assets/hemkund.webp';
import gangotri from '../assets/gangotri.jpg';
import kanchiDham from '../assets/neemKaroli.png';

const TravelSuggestions = ({ setDropLocation, scrollToBookingForm }) => {
  const routes = [
    { id: 1, name: 'Triveni Ghaat', image: trivaniGhat, description: 'Witness spirituality in motion at the holy Triveni Ghat' },
    { id: 2, name: 'Munsiyari', image: munsiyari, description: 'Discover serenity and adventure in the lap of the Himalayas' },
    { id: 3, name: 'Haridwar', image: haridwar, description: 'Experience the sacred rituals and spiritual vibes of Haridwar' },
    { id: 4, name: 'Surkanda', image: surkanda, description: 'A trek to the skies, a prayer to the heart' },
    { id: 5, name: 'Nainital', image: nanital, description: 'Discover serenity, boating, and hilltop charm in Nainital' },
    { id: 6, name: 'Auli', image: auli, description: 'Ski, trek, and soak in the breathtaking views of Auli' },
    { id: 7, name: 'Hemkund Sahib', image: hemkund, description: 'A sacred journey to the high-altitude abode of faith' },
    { id: 8, name: 'Gangotri', image: gangotri, description: 'Step into spirituality at the source of the holy Ganga' },
    { id: 9, name: 'Kanchi Dham', image: kanchiDham, description: 'Seek blessings and serenity at Kanchidham Dham.' },
  ];

  const [shownRoutesCount, setShownRoutesCount] = useState(6);

  const loadMoreRoutes = () => {
    setShownRoutesCount(prevCount => prevCount + 6);
  };

  // Handles "Book Ride" click
const handleBookRide = (destination) => {
  setDropLocation(destination);
  if (scrollToBookingForm) scrollToBookingForm(); // scrolls smoothly
};



  return (
    <div className="suggestions-container">
      <h2 className="suggestions-title">Travel Suggestions</h2>
      <div className="suggestions-list">
        {routes.slice(0, shownRoutesCount).map((route) => (
          <div className="suggestion-card" key={route.id}>
            <img src={route.image} alt={route.name} className="suggestion-img" />
            <h3 className="suggestion-title">{route.name}</h3>
            <p className="suggestion-description">{route.description}</p>
            <button
              className="book-ride-btn bg-black text-white px-4 py-2 mt-2 hover:bg-gray-800"
              onClick={() => handleBookRide(route.name)}
            >
              Book Ride
            </button>
          </div>
        ))}
      </div>

      {shownRoutesCount < routes.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMoreRoutes}>
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelSuggestions;
