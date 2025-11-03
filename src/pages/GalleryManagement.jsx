import React, { useEffect, useState } from "react";

function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://aarna-enterprises-co.onrender.com/gallery/fetchAllImages"
        );
        const data = await response.json();
        if (response.ok) {
          setImages(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle toggle approval status
  const handleToggleStatus = async (imgId, currentStatus) => {
    // Optimistic UI: update immediately
    setImages((prev) =>
      prev.map((img) =>
        img.imgId === imgId ? { ...img, isApproved: !currentStatus } : img
      )
    );

    try {
      const response = await fetch(
        "https://aarna-enterprises-co.onrender.com/gallery/updateImage",
        {
          method: "POST", // backend expects POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imgId, isApproved: !currentStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to update status:", data.message || data);
        // Rollback state on failure
        setImages((prev) =>
          prev.map((img) =>
            img.imgId === imgId ? { ...img, isApproved: currentStatus } : img
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
      // Rollback on error
      setImages((prev) =>
        prev.map((img) =>
          img.imgId === imgId ? { ...img, isApproved: currentStatus } : img
        )
      );
    }
  };

  if (loading)
    return (
      <div className="bg-black text-yellow-400 min-h-screen flex justify-center items-center text-xl">
        Loading images...
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen p-5 font-sans relative">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
        Gallery Management
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-800 bg-zinc-900 text-white rounded-md overflow-hidden">
          <thead>
            <tr className="bg-zinc-800 text-yellow-400 text-left">
              <th className="py-3 px-4 border-b border-gray-700">Image</th>
              <th className="py-3 px-4 border-b border-gray-700">Author</th>
              <th className="py-3 px-4 border-b border-gray-700">Status</th>
              <th className="py-3 px-4 border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr
                key={img._id}
                className="border-b border-gray-800 hover:bg-zinc-800 transition"
              >
                <td className="py-2 px-3 md:py-3 md:px-4">
                  <div
                    className="w-24 sm:w-32 md:w-40 lg:w-48 aspect-video bg-zinc-800 rounded-md border border-gray-700 flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                    onClick={() => setSelectedImage(img.url)}
                  >
                    <img
                      src={img.url}
                      alt={img.author}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">{img.author}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    img.isApproved ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  {img.isApproved ? "Show" : "Hide"}
                </td>
                <td className="py-3 px-4">
                  <label className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={img.isApproved}
                      onChange={() =>
                        handleToggleStatus(img.imgId, img.isApproved)
                      }
                      className="opacity-0 w-0 h-0 peer"
                    />
                    <span className="absolute inset-0 bg-gray-600 rounded-full transition peer-checked:bg-yellow-400"></span>
                    <span className="absolute left-1 bottom-1 bg-black w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
          <button
            className="absolute top-6 right-6 text-yellow-400 text-3xl font-bold hover:text-yellow-300"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default GalleryManagement;
