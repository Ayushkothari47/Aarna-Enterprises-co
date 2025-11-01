import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const getImgAPI = `${SERVER_URL}/gallery/fetchApprovedImage`;
const uploadImg = `${SERVER_URL}/gallery/upload-image`;




const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullscreenImg, setFullscreenImg] = useState(null); // 👈 NEW STATE
  const [uploading, setUploading] = useState(false);

  // Fetch approved images
  const fetchApprovedImages = async () => {
    try {
      const res = await axios.get(getImgAPI);
      setImages(res.data.data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedImages();
  }, []);

  // When user selects a file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    setShowConfirm(true);
  };

  // Upload confirmed image
  const handleConfirmUpload = async () => {
    if (!author.trim()) {
      alert("Please enter your name before uploading.");
      return;
    }

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("author", author.trim());

    try {
      setUploading(true); // start uploading
      await axios.post(uploadImg, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully! Wait for admin Approval");
      setShowConfirm(false);
      setPreviewURL(null);
      setSelectedFile(null);
      fetchApprovedImages();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed. Check console for details.");
    } finally {
      setUploading(false); // stop uploading
    }
  };


  // Cancel confirmation
  const handleCancel = () => {
    setShowConfirm(false);
    setPreviewURL(null);
    setSelectedFile(null);
  };

  // Open fullscreen view
  const handleImageClick = (url) => {
    setFullscreenImg(url);
  };

  // Close fullscreen
  const closeFullscreen = () => {
    setFullscreenImg(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 p-4 sm:p-6">
      <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">
        Our Gallery
      </h2>

      {/* Author Input + Upload */}

      <div className="flex justify-center mb-10">
        <label className="cursor-pointer bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-700 transition">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-96 text-center relative">
            <h3 className="text-xl text-white mb-4 font-semibold">Confirm Upload</h3>

            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-700"
              />
            )}

            {/* 👇 Name input inside modal */}
            <input
              type="text"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-gray-400 mb-4">
              This image will be uploaded under the name{" "}
              <span className="text-blue-400 font-semibold">
                {author || "Anonymous"}
              </span>.
            </p>

            <div className="flex justify-center gap-4 relative">
              <button
                onClick={handleConfirmUpload}
                disabled={uploading}
                className={`relative px-4 py-2 rounded-lg text-white ${uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                Confirm
                {/* 👇 Spinner overlay when uploading */}
                {uploading && (
                  <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin mb-6"></div>
                    <p className="text-white text-xl font-semibold tracking-wide">
                      Uploading...
                    </p>
                  </div>
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={uploading}
                className={`px-4 py-2 rounded-lg text-white ${uploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
                  }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Image Grid */}
      {loading ? (
        <p className="text-white text-center">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-400 text-center">No approved images yet.</p>
      ) : (
        <div className="flex-1 overflow-y-auto flex justify-center">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 space-y-4 mx-auto max-w-7xl px-2">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(img.url)}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-lg bg-gray-800 cursor-pointer transition-all duration-300 hover:scale-[1.02] mx-1"
              >
                <img
                  src={img.url}
                  alt={img.author || `Image ${index}`}
                  className="w-full object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
                />
                <p className="text-gray-400 text-sm text-center py-2 bg-gray-900 rounded-b-xl">
                  Uploaded by: {img.author || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        </div>

      )}

      {/* Fullscreen Modal */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeFullscreen}
        >
          <img
            src={fullscreenImg}
            alt="Fullscreen"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl transition-transform duration-300 scale-100 hover:scale-105"
          />
          <button
            onClick={closeFullscreen}
            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-red-400"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
