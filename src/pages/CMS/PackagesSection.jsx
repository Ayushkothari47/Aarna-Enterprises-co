// 📁 src/components/CMS/PackagesSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon, PlusIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";

import api from '../../api/api';


const PackagesSection = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedPackage, setEditedPackage] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPackage, setNewPackage] = useState({
        packageName: "",
        packageDescription: "",
        price: "",
        thumbnail_url: null,
        img1: null,
        img2: null,
        img3: null,
    });
    const [deleting, setDeleting] = useState(false);



    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await api.get("/CMS/fetchAllPackages");
            setPackages(res.data?.data ?? []);
        } catch (err) {
            console.error("Error fetching packages:", err);
        } finally {
            setLoading(false);
        }
    };


    // ✅ Add new package
    const handleAddNewPackage = async () => {
        if (
            !newPackage.packageName ||
            !newPackage.price ||
            !newPackage.thumbnail_url
        ) {
            return alert("Please fill all required fields and upload a thumbnail.");
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("packageName", newPackage.packageName);
            formData.append("packageDescription", newPackage.packageDescription);
            formData.append("price", newPackage.price);

            ["thumbnail_url", "img1", "img2", "img3"].forEach((key) => {
                if (newPackage[key]) formData.append(key, newPackage[key]);
            });

            setShowAddModal(false);

            const res = await api.post("/CMS/addPackage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });



            const newPkg = res.data?.data;
            if (newPkg) {
                setPackages((prev) => [...prev, newPkg]);
            } else {
                await fetchPackages(); // fallback refresh
            }

            // Reset and close
            setNewPackage({
                packageName: "",
                packageDescription: "",
                price: "",
                thumbnail_url: null,
                img1: null,
                img2: null,
                img3: null,
            });
            setShowAddModal(false);
        } catch (err) {
            console.error("Error adding package:", err);
            alert("Failed to add package.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = (pkgId) => {
        setSelectedPackage(pkgId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
    try {
        setDeleting(true);
        await api.delete("/CMS/deletePackage", { data: { packageId: selectedPackage } });
        setPackages((prev) => prev.filter((p) => p.packageId !== selectedPackage));
        setShowDeleteModal(false);
    } catch (err) {
        console.error("Error deleting package:", err);
        alert("Failed to delete package.");
    } finally {
        setDeleting(false);
    }
};


    const openDetailView = (pkg) => {
        setSelectedPackage(pkg);
        setEditedPackage({ ...pkg });
        setShowDetailModal(true);
        setEditMode(false);
    };

    const closeDetailView = () => {
        setShowDetailModal(false);
        setSelectedPackage(null);
        setEditMode(false);
    };

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setEditedPackage({ ...editedPackage, [field]: imageUrl, [`${field}_file`]: file });
        }
    };

    const handleRemoveImage = (field) => {
        setEditedPackage({ ...editedPackage, [field]: null });
    };

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append("packageId", editedPackage.packageId);
            formData.append("packageName", editedPackage.packageName);
            formData.append("packageDescription", editedPackage.packageDescription);
            formData.append("price", editedPackage.price);

            // Append new images if re-uploaded
            ["thumbnail_url", "img1", "img2", "img3"].forEach((key) => {
                if (editedPackage[`${key}_file`]) {
                    formData.append(key, editedPackage[`${key}_file`]);
                }
            });


            const res = await api.post("/CMS/updatePackage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Update local state
            setPackages((prev) =>
                prev.map((p) => (p.packageId === editedPackage.packageId ? res.data.data : p))
            );


            setSelectedPackage(res.data.data);
            setShowDetailModal(false);
            setEditMode(false);
        } catch (err) {
            console.error("Error saving package:", err);
        }
    };

    return (
        <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 mt-10">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3 mb-4">
                <h2 className="text-xl font-semibold">Packages</h2>
            </div>

            {uploading && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
                    <div className="border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-6"></div>
                    <p className="text-white text-xl font-semibold tracking-wide">Uploading...</p>
                </div>
            )}

            {loading ? (
                <p className="text-gray-400">Loading packages...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* Add New Package */}
                    <label
                        className="relative border-2 border-yellow-400 rounded-md overflow-hidden bg-neutral-800 group flex flex-col justify-between h-[11.5rem] cursor-pointer hover:bg-yellow-400/10 transition"
                        onClick={() => setShowAddModal(true)}
                    >
                        <div className="flex flex-col items-center justify-center h-32">
                            <PlusIcon className="w-8 h-10 mt-3 text-yellow-400 group-hover:text-white" />
                        </div>
                        <div className="p-2 text-center">
                            <h4 className="text-md font-semibold text-white truncate">Add New Package</h4>
                        </div>
                    </label>


                    {/* Existing Packages */}
                    {packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="relative border-2 rounded-md overflow-hidden bg-neutral-800 group cursor-pointer hover:border-yellow-400 transition"
                            onClick={() => openDetailView(pkg)}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(pkg.packageId);
                                }}
                                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-100 group-hover:opacity-100 transition z-10"
                            >
                                <TrashIcon className="w-5 h-5 text-yellow-400" />
                            </button>

                            <img
                                src={pkg.thumbnail_url}
                                alt={pkg.packageName}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-2 text-center">
                                <h4 className="text-sm font-semibold text-white truncate">
                                    {pkg.packageName.replace(/"/g, "")}
                                </h4>
                                <p className="text-xs text-gray-400">₹{pkg.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">Delete this package?</h3>
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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-[200]">
        <div className="border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-4"></div>
        <p className="text-white text-lg font-semibold tracking-wide">
            Deleting...
        </p>
    </div>
)}


            {/* Detailed Package Modal */}
            {showDetailModal && editedPackage && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
                    <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={closeDetailView}
                            className="absolute top-3 right-3 text-yellow-400 hover:text-white"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                {editMode ? "Edit Package" : "Package Details"}
                            </h2>
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className="text-yellow-400 hover:text-white flex items-center gap-1"
                            >
                                <PencilIcon className="w-5 h-5" />
                                Edit
                            </button>
                        </div>

                        {/* Images Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {["thumbnail_url", "img1", "img2", "img3"].map((key, idx) => (
                                <div key={idx} className="relative border border-yellow-400 rounded-lg overflow-hidden h-40 flex justify-center items-center bg-neutral-800">
                                    {editedPackage[key] ? (
                                        <>
                                            <img
                                                src={editedPackage[key]}
                                                alt={`Image ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {editMode && (
                                                <button
                                                    onClick={() => handleRemoveImage(key)}
                                                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                                                >
                                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        editMode && (
                                            <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-yellow-400/20">
                                                <PlusIcon className="w-10 h-10 text-yellow-400" />
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {key === "thumbnail_url" ? "Upload Thumbnail" : "Add Image"}
                                                </p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageChange(e, key)}
                                                />
                                            </label>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Text Inputs */}
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editedPackage.packageName.replace(/"/g, "")}
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditedPackage({ ...editedPackage, packageName: e.target.value })
                                }
                                className="w-full p-2 rounded-md bg-neutral-800 border border-yellow-400 text-white"
                            />
                            <textarea
                                value={editedPackage.packageDescription.replace(/"/g, "")}
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditedPackage({ ...editedPackage, packageDescription: e.target.value })
                                }
                                className="w-full p-2 rounded-md bg-neutral-800 border border-yellow-400 text-white min-h-[100px]"
                            />
                            <input
                                type="number"
                                value={editedPackage.price}
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditedPackage({ ...editedPackage, price: e.target.value })
                                }
                                className="w-full p-2 rounded-md bg-neutral-800 border border-yellow-400 text-white"
                            />
                        </div>

                        {/* Save Button */}
                        {editMode && (
                            <div className="text-right mt-6">
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* Add New Package Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[200] p-4">
                    <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-full max-w-lg relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-3 right-3 text-yellow-400 hover:text-white"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                            Add New Package
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Package Name"
                                value={newPackage.packageName}
                                onChange={(e) =>
                                    setNewPackage({ ...newPackage, packageName: e.target.value })
                                }
                                className="w-full p-2 bg-neutral-800 border border-yellow-400 text-white rounded-md"
                            />

                            <textarea
                                placeholder="Description"
                                value={newPackage.packageDescription}
                                onChange={(e) =>
                                    setNewPackage({
                                        ...newPackage,
                                        packageDescription: e.target.value,
                                    })
                                }
                                className="w-full p-2 bg-neutral-800 border border-yellow-400 text-white rounded-md min-h-[100px]"
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                value={newPackage.price}
                                onChange={(e) =>
                                    setNewPackage({ ...newPackage, price: e.target.value })
                                }
                                className="w-full p-2 bg-neutral-800 border border-yellow-400 text-white rounded-md"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                {["thumbnail_url", "img1", "img2", "img3"].map((key, idx) => (
                                    <label
                                        key={idx}
                                        className="flex flex-col items-center justify-center h-28 border border-yellow-400 rounded-md bg-neutral-800 cursor-pointer hover:bg-yellow-400/20"
                                    >
                                        {newPackage[`${key}_preview`] ? (
                                            <img
                                                src={newPackage[`${key}_preview`]}
                                                alt=""
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        ) : (

                                            <>
                                                <PlusIcon className="w-8 h-8 text-yellow-400" />
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {key === "thumbnail_url"
                                                        ? "Thumbnail"
                                                        : `Image ${idx}`}
                                                </p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const previewUrl = URL.createObjectURL(file); // create preview once
                                                    setNewPackage((prev) => ({
                                                        ...prev,
                                                        [key]: file,                     // actual image file
                                                        [`${key}_preview`]: previewUrl,  // store preview URL
                                                    }));
                                                }
                                            }}
                                        />


                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="text-right mt-6">
                            <button
                                onClick={handleAddNewPackage}
                                className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
                            >
                                Add Package
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default PackagesSection;
