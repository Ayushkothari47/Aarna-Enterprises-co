import React, { useState } from 'react';
import './PDP.css';  // Import your CSS for styling and animations
import badrinath from '../assets/badrinath.png';
import kedarnath from '../assets/kedarnath.png';
import mussorie from '../assets/musoorie.jpg';

const PDP = () => {
    // State for controlling carousel images
    const [currentImage, setCurrentImage] = useState(0); // Start from 0, the first image

    // Array of image paths
    const images = [
        { id: 0, src: badrinath, alt: "Badrinath" },
        { id: 1, src: kedarnath, alt: "Kedarnath" },
        { id: 2, src: mussorie, alt: "Mussoorie" },
    ];

    // Package Details
    const packageDetails = {
        title: "Kedarnath 1 Day Package",
        description: "Visit the holy Kedarnath Temple in this 1-day package.",
        // price: 4999,
        locations: {
            pickup: "Your Location",
            destination1: "Kedarnath",
            destination2: "Final Destination (optional)"
        }
    };

    // Handle Carousel Change
    const handleCarouselChange = (index) => {
        setCurrentImage(index); // Set the image by index when thumbnail is clicked
    };

    return (
        <div>
            {/* PDP Container for left and right sections */}
            <div className="pdp-container">
                <div className="pdp-left-section">
                    {/* Main Image */}
                    <div className="main-image">
                        <img src={images[currentImage].src} alt={images[currentImage].alt} />
                    </div>

                    {/* Thumbnails Carousel */}
                    <div className="thumbnail-carousel">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                                onClick={() => handleCarouselChange(index)}
                            >
                                <img src={image.src} alt={image.alt} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pdp-right-section">
                    <h2>{packageDetails.title}</h2>
                    <p>{packageDetails.description}</p>
                    <div className="package-price">
                        {/* <span>Price: ₹{packageDetails.price}</span> */}
                    </div>

                    {/* Booking Form */}
                    <form className="booking-form">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" required />

                        <label>Email Address</label>
                        <input type="email" placeholder="Enter your email" required />

                        <label>Phone Number</label>
                        <input type="tel" placeholder="Enter your phone number" required />

                        <button type="submit" className="book-now-btn">
                            Send Enquiry
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default PDP;
