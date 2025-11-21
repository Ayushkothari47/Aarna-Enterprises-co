// 📁 src/components/CMS/MobileBannerSection.jsx
import React, { useEffect, useState } from "react";
import { TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import api from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';

const MobileBannerSection = () => {
  const [mobileBanners, setMobileBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMobileBanner, setSelectedMobileBanner] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fullScreenMobileBanner, setFullScreenMobileBanner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMobileBanners();
  }, []);

  const fetchMobileBanners = async () => {
    try {
      const res = await api.get("/CMS/fetchAllMobileBanners");
      const bannerData = res.data?.data?.[0]?.banners || [];
      setMobileBanners(bannerData);
      const visibility = res.data?.data?.[0]?.isVisible ?? false;
      setIsVisible(visibility);
    } catch (err) {
      toast.error("Error fetching mobile banners:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      const res = await api.put("/CMS/updateBannerMobileVisibility", {
        isVisible: !isVisible,
      });
      const updatedVisibility = res.data?.data?.isVisible;
      toast.success("Visibilty Updated")
      setIsVisible(updatedVisibility ?? false);
    } catch (err) {
      toast.error("Error updating mobile banner visibility:", err);
    }
  };

  const handleAddBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("banner", file);

    try {
      setUploading(true);
      const res = await api.post("/CMS/addMobileBanner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMobileBanners(res.data.data.banners);
    } catch (err) {
      toast.error("Error uploading mobile banner:", err);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleDeleteClick = (bannerUrl) => {
    setSelectedMobileBanner(bannerUrl);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete("/CMS/deleteMobileBanner", { data: { bannerUrl: selectedMobileBanner } });
      setMobileBanners(mobileBanners.filter((b) => b !== selectedMobileBanner));
      toast.success("Mobile Banner Deleted!");
      setShowDeleteModal(false);
      setSelectedMobileBanner(null);
    } catch (err) {
      toast.error("Error deleting mobile banner:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-yellow-400 mt-10 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-700 pb-3 mb-4">
        <div className="text-left">
          <h2 className="text-xl font-semibold">Mobile Banners</h2>
          <p className="text-sm text-yellow-400">(Tip: 400 x 250 is the best size for Mobile Banners)</p>
        </div>

        {/* Toggle Visibility */}
        <div className="flex items-center gap-2">
          <span className="text-sm ms-2 text-gray-300">Visible</span>
          <button
            onClick={handleToggleVisibility}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isVisible ? "bg-yellow-400" : "bg-gray-600"
              }`}
          >
            <div
              className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isVisible ? "translate-x-6" : "translate-x-0"
                }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Upload Overlay */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
          <div className="border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-6"></div>
          <p className="text-white text-xl font-semibold tracking-wide">
            Uploading...
          </p>
        </div>
      )}

      {/* Mobile Banners Grid */}
      {loading ? (
        <p className="text-gray-400">Loading mobile banners...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Add Banner */}
          <label className="relative border-2 border-yellow-400 rounded-md h-32 flex items-center justify-center cursor-pointer group hover:bg-yellow-400/20 transition">
            <input
              type="file"
              className="hidden"
              onChange={handleAddBanner}
              disabled={uploading}
            />
            <PlusIcon className="w-8 h-8 text-yellow-400 group-hover:text-white" />
          </label>

          {/* Existing Mobile Banners */}
          {mobileBanners.map((bannerUrl, idx) => (
            <div
              key={idx}
              className="relative border-2 border-none rounded-md overflow-hidden bg-neutral-800 group"
            >
              <button
                onClick={() => handleDeleteClick(bannerUrl)}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-100 group-hover:opacity-100 transition z-10"
              >
                <TrashIcon className="w-5 h-5 text-yellow-400" />
              </button>

              <img
                src={bannerUrl}
                alt={`Mobile Banner ${idx + 1}`}
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => setFullScreenMobileBanner(bannerUrl)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Delete this banner?</h3>
            <img
              src={selectedMobileBanner}
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

      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
          <div className="border-t-4 border-red-600 rounded-full w-16 h-16 animate-spin mb-6"></div>
          <p className="text-white text-xl font-semibold tracking-wide">Deleting...</p>
        </div>
      )}

      {/* Full Screen Banner */}
      {fullScreenMobileBanner && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <button
            onClick={() => setFullScreenMobileBanner(null)}
            className="absolute top-5 right-5 text-yellow-400 hover:text-white z-50"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <img
            src={fullScreenMobileBanner}
            alt="Full screen mobile banner"
            className="max-h-full max-w-full object-contain rounded-md border-2 border-yellow-400"
          />
        </div>
      )}
    </div>
  );
};

export default MobileBannerSection
