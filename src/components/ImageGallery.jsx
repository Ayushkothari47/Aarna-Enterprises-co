import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3000";
const getImgAPI = `${SERVER_URL}/gallery/fetchApprovedImage`;
const uploadImg = `${SERVER_URL}/gallery/upload-image`;

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

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
      await axios.post(uploadImg, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Image uploaded successfully!");
      setShowConfirm(false);
      setPreviewURL(null);
      setSelectedFile(null);
      fetchApprovedImages();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed. Check console for details.");
    }
  };

  // Cancel confirmation
  const handleCancel = () => {
    setShowConfirm(false);
    setPreviewURL(null);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 p-4 sm:p-6">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
        Moments Captured !
      </h2>

      {/* Author Input + Upload */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <label className="cursor-pointer bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-700 transition">
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
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-96 text-center">
            <h3 className="text-xl text-white mb-4">Confirm Upload</h3>
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-700"
              />
            )}
            <p className="text-gray-400 mb-4">
              Are you sure you want to upload this image as{" "}
              <span className="text-blue-400 font-semibold">{author}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmUpload}
                className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
              >
                Yes, Upload
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-700"
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
        <div className="flex-1 overflow-y-auto">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-gray-800"
              >
                <img
                  src={img.url}
                  alt={img.author || `Image ${index}`}
                  className="w-full object-cover rounded-xl"
                />
                <p className="text-gray-400 text-sm text-center py-2">
                  Uploaded by: {img.author || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
