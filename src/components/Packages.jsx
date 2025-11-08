import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookPackage from "./BookPackage";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const allPackages = `${SERVER_URL}/package/fetchAllPackages`;

const Packages = () => {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(allPackages);
        if (!response.ok) {
          throw new Error("Failed to fetch packages, Unable to reach server");
        }
        const data = await response.json();
        // Map API response to match your component structure
        const formattedData = data.data.map((pkg, index) => ({
          id: index + 1,
          title: pkg.packageName.replace(/"/g, ""),
          description: pkg.packageDescription.replace(/"/g, ""),
          price: `₹${pkg.price.toLocaleString()} / person`,
          image: pkg.thumbnail_url, // main thumbnail
          thumbnail_url: pkg.thumbnail_url,
          img1: pkg.img1,
          img2: pkg.img2,
          img3: pkg.img3,
        }));

        setTourData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading)
    return <p className="text-center text-white py-12">Loading packages...</p>;
  if (error) return <p className="text-center text-red-500 py-12">{error}</p>;

  return (
    <div className="md:py-12 sm:py-8 p-4">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-8">
        Popular Tour Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12">
        {tourData.map((tour) => (
          <div
            key={tour.id}
            className="bg-gray-800 text-yellow-400 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                <p className="text-white text-sm mb-3 line-clamp-1">{tour.description}</p>
                <p className="text-yellow-300 font-semibold">{tour.price}</p>
              </div>
              <Link to="/book-package" state={{ package: tour }}>
                <button
                  className="w-full mt-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
                >
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
