import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const fetchAllImages = `${SERVER_URL}/CMS/fetchAllBanner`;
const deleteBannerAPI = `${SERVER_URL}/CMS/deleteBanner`;
const addBannerAPI = `${SERVER_URL}/CMS/addBanner`;

const CMSPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] = useState(null); // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fullScreenBanner, setFullScreenBanner] = useState(null); // full screen view
  const [uploading, setUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // default visible

  useEffect(() => {
    fetchBanners();
  }, []);


  const handleToggleVisibility = async () => {
  try {
    const res = await axios.put(`${SERVER_URL}/CMS/updateBannerVisibility`, {
      isVisible: !isVisible,
    });

    const updatedVisibility = res.data?.data?.isVisible;
    setIsVisible(updatedVisibility ?? false); // fallback false
  } catch (err) {
    console.error("Error updating banner visibility:", err);
  }
};




  const fetchBanners = async () => {
  try {
    const res = await axios.get(fetchAllImages);
    const bannerData = res.data?.data?.[0]?.banners || [];
    setBanners(bannerData);

    // fetch visibility from the same response if available
    const visibility = res.data?.data?.[0]?.isVisible ?? false; // default false
    if (visibility !== undefined) {
      setIsVisible(res.data?.data?.[0]?.isVisible ?? false);
    }
  } catch (err) {
    console.error("Error fetching banners:", err);
  } finally {
    setLoading(false);
  }
};


  // Delete handlers
  const handleDeleteClick = (bannerUrl) => {
    setSelectedBanner(bannerUrl);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(deleteBannerAPI, { data: { bannerUrl: selectedBanner } });
      setBanners(banners.filter((b) => b !== selectedBanner));
      setShowDeleteModal(false);
      setSelectedBanner(null);
    } catch (err) {
      console.error("Error deleting banner:", err);
    }
  };

  // Upload handlers
  const handleAddBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("banner", file);

    try {
      setUploading(true);
      const res = await axios.post(addBannerAPI, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBanners(res.data.data.banners);
    } catch (err) {
      console.error("Error uploading banner:", err);
    } finally {
      setUploading(false);
      e.target.value = null; // reset input
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-poppins">
      <h1 className="text-3xl text-yellow-400 text-center font-bold mb-10">
         Content Management
      </h1>

      <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-700 pb-3 mb-4">
  <h2 className="text-xl font-semibold">Banners Management</h2>

  {/* Toggle Button */}
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-300">Visible</span>
    <button
      onClick={handleToggleVisibility}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isVisible ? "bg-yellow-400" : "bg-gray-600"
      }`}
    >
      <div
        className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          isVisible ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  </div>
</div>


        {/* Preview Section */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-yellow-300">
            Preview: Current Banners
          </h3>

          {loading ? (
            <p className="text-gray-400">Loading banners...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Add Banner Box */}
              <label className="relative border-2 border-yellow-400 rounded-md h-32 flex items-center justify-center cursor-pointer group hover:bg-yellow-400/20 transition">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleAddBanner}
                  disabled={uploading}
                />
                <PlusIcon className="w-8 h-8 text-yellow-400 group-hover:text-white" />
              </label>

              {/* Existing Banners */}
              {banners.map((bannerUrl, idx) => (
                <div
                  key={idx}
                  className="relative border-2 border-yellow-400 rounded-md overflow-hidden bg-neutral-800 group"
                >
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDeleteClick(bannerUrl)}
                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-100 group-hover:opacity-100 transition z-10"
                  >
                    <TrashIcon className="w-5 h-5 text-yellow-400" />
                  </button>

                  <img
                    src={bannerUrl}
                    alt={`Banner ${idx + 1}`}
                    className="w-full h-32 object-cover cursor-pointer"
                    onClick={() => setFullScreenBanner(bannerUrl)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Delete this banner?</h3>
            <img
              src={selectedBanner}
              alt="Banner preview"
              className="w-full h-28 object-cover rounded mb-4 border border-yellow-400"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Banner Modal */}
      {fullScreenBanner && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <button
            onClick={() => setFullScreenBanner(null)}
            className="absolute top-5 right-5 text-yellow-400 hover:text-white z-50"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <img
            src={fullScreenBanner}
            alt="Full screen banner"
            className="max-h-full max-w-full object-contain rounded-md border-2 border-yellow-400"
          />
        </div>
      )}
    </div>
  );
};

export default CMSPage;
