import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../api/api';



const Packages = () => {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/siteContent/fetchPackages");

        // Axios automatically throws for non-200 statuses, so no need for res.ok check
        const data = response.data;

        // Format API response
        const formattedData = data.data.map((pkg) => ({
          packageId: pkg.packageId,
          title: pkg.packageName.replace(/"/g, ""),
          description: pkg.packageDescription.replace(/"/g, ""),
          price: `₹${pkg.price.toLocaleString()} / person`,
          image: pkg.thumbnail_url,
          thumbnail_url: pkg.thumbnail_url,
          img1: pkg.img1,
          img2: pkg.img2,
          img3: pkg.img3,
        }));

        setTourData(formattedData);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching packages:", err);

        // Axios error handling
        if (err.response) {
          setError(err.response.data.message || "Failed to fetch packages");
        } else {
          setError("Unable to reach server");
        }

        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading)
    return <p className="text-center text-white py-12">Loading packages...</p>;

  if (error)
    return <p className="text-center text-red-500 py-12">{error}</p>;

  return (
    <div className="md:py-12 sm:py-8 p-4">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-8">
        Popular Tour Packages
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12">

        {tourData.map((tour) => (
          <div
            key={tour.id}
            className="relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Full Background Image */}
            <img
              src={tour.image}
              alt={tour.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Blurred Overlay Content */}
            <div className="absolute bottom-0 w-full p-4 bg-black/70 text-yellow-300">
              <h3 className="text-lg font-semibold">{tour.title}</h3>
              <p className="text-white text-sm mb-2 line-clamp-1">
                {tour.description}
              </p>
              <p className="font-semibold mb-2">{tour.price}</p>

              <Link to="/book-package" state={{ package: tour }}>
                <button className="w-full bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-200">
                  View Package
                </button>
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Packages;
