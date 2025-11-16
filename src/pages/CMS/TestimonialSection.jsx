// 📁 src/components/CMS/TestimonialSection.jsx
import React, { useEffect, useState } from "react";
import { TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import api from '../../api/api';


const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);


    // Form state
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        person_name: "",
        rating: "",
        review: "",
        profile_pic: null
    });


    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get("/siteContent/get-all-reviews");
            setTestimonials(res.data?.data || []);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTestimonial = async (e) => {
        e.preventDefault();
        if (!formData.person_name || !formData.rating || !formData.review || !formData.profile_pic) {
            return alert("All fields are required!");
        }

        const data = new FormData();
        data.append("profile_pic", formData.profile_pic);
        data.append("person_name", formData.person_name);
        data.append("rating", formData.rating);
        data.append("review", formData.review);
        data.append("isVisible", true);

        try {
            setUploading(true);
            const res = await api.post("/CMS/add-review", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setTestimonials([res.data.data, ...testimonials]);
            setShowAddModal(false);
            setFormData({ person_name: "", rating: "", review: "", profile_pic: null });
        } catch (err) {
            console.error("Error uploading testimonial:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setDeleting(true); // start loading
            await api.delete(`/CMS/delete-review/${selectedTestimonial.testimonial_Id}`);
            setTestimonials(testimonials.filter(t => t.testimonial_Id !== selectedTestimonial.testimonial_Id));
            setShowDeleteModal(false);
            setSelectedTestimonial(null);
        } catch (err) {
            console.error("Error deleting testimonial:", err);
        } finally {
            setDeleting(false); // stop loading
        }
    };


    const toggleVisibility = async (testimonial) => {
        // Optimistically update UI using functional update
        setTestimonials(prevTestimonials =>
            prevTestimonials.map(t =>
                t.testimonial_Id === testimonial.testimonial_Id
                    ? { ...t, isVisible: !t.isVisible }
                    : t
            )
        );

        try {
            await api.patch(`/CMS/update-visibility/${testimonial.testimonial_Id}`, {
                isVisible: !testimonial.isVisible,
            });
        } catch (err) {
            console.error("Error updating visibility:", err);
            // Revert change on error
            setTestimonials(prevTestimonials =>
                prevTestimonials.map(t =>
                    t.testimonial_Id === testimonial.testimonial_Id
                        ? { ...t, isVisible: testimonial.isVisible }
                        : t
                )
            );
        }
    };



    const openDetailModal = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setShowDetailModal(true);
    };


    return (
        <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 mt-10">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3 mb-4">
                <h2 className="text-xl font-semibold">Testimonials</h2>
            </div>

            {uploading && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
                    <div className="border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-6"></div>
                    <p className="text-white text-xl font-semibold tracking-wide">Uploading...</p>
                </div>
            )}

            {loading ? (
                <p className="text-gray-400">Loading testimonials...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Add Testimonial */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="relative border-2 border-yellow-400 rounded-md h-48 flex flex-col items-center justify-center cursor-pointer group hover:bg-yellow-400/20 transition"
                    >
                        <PlusIcon className="w-8 h-8 text-yellow-400 group-hover:text-white mb-2" />
                        <span className="text-sm text-gray-300">Add Testimonial</span>
                    </button>

                    {/* Existing Testimonials */}
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.testimonial_Id}

                            className="relative border-2 border-none rounded-md overflow-hidden bg-neutral-800 group p-2 flex flex-col items-center cursor-pointer"
                        >

                            <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(testimonial); }}
                                    className="bg-black/60 rounded-full p-1 opacity-100 hover:bg-red-600 transition"
                                >
                                    <TrashIcon className="w-5 h-5 text-yellow-400" />
                                </button>

                                {/* Visibility Toggle Switch */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={testimonial.isVisible}
                                        onChange={(e) => { e.stopPropagation(); toggleVisibility(testimonial); }}
                                    />
                                    {/* Track */}
                                    <div className="w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-yellow-400 transition-colors"></div>
                                    {/* Thumb */}
                                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5"></div>
                                </label>

                            </div>

                            {/* <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteClick(testimonial); }}
                                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-100 group-hover:opacity-100 transition z-10"
                            >
                                <TrashIcon className="w-5 h-5 text-yellow-400" />
                            </button> */}

                            <img
                                src={testimonial.profile_pic_url}
                                alt={testimonial.person_name}
                                className="w-24 h-24 object-cover rounded-full mb-2"
                                onClick={() => openDetailModal(testimonial)}
                            />
                            <h3 className="text-white font-semibold" onClick={() => openDetailModal(testimonial)}>{testimonial.person_name}</h3>
                            <p className="text-yellow-400" onClick={() => openDetailModal(testimonial)}>Rating: {testimonial.rating}/5</p>
                            <p className="text-gray-300 text-sm text-center" onClick={() => openDetailModal(testimonial)}>
                                {testimonial.review.length > 60
                                    ? testimonial.review.slice(0, 60) + "..."
                                    : testimonial.review}
                            </p>


                        </div>
                    ))}
                </div>
            )}

            {/* Add Testimonial Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add Testimonial</h3>
                            <button onClick={() => setShowAddModal(false)}>
                                <XMarkIcon className="w-6 h-6 text-yellow-400" />
                            </button>
                        </div>
                        <form onSubmit={handleAddTestimonial} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Person Name"
                                value={formData.person_name}
                                onChange={(e) => setFormData({ ...formData, person_name: e.target.value })}
                                className="p-2 rounded bg-neutral-800 text-white border border-yellow-400"
                            />
                            <input
                                type="number"
                                placeholder="Rating (1-5)"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                className="p-2 rounded bg-neutral-800 text-white border border-yellow-400"
                                min={1} max={5}
                            />
                            <textarea
                                placeholder="Review"
                                value={formData.review}
                                onChange={(e) => {
                                    setFormData({ ...formData, review: e.target.value });

                                    // Auto-resize
                                    e.target.style.height = "auto"; // Reset height
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Set to scrollHeight
                                }}
                                className="p-2 rounded bg-neutral-800 text-white border border-yellow-400 overflow-hidden"
                            />

                            <label className="cursor-pointer bg-yellow-400 text-black py-2 px-4 rounded text-center hover:bg-yellow-500 transition">
                                + Upload Image
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFormData({ ...formData, profile_pic: e.target.files[0] })}
                                />
                            </label>

                            {formData.profile_pic && (
                                <img
                                    src={URL.createObjectURL(formData.profile_pic)}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-full mt-4 mx-auto border-2 border-yellow-400"
                                />
                            )}



                            <button
                                type="submit"
                                className="bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
                                disabled={uploading}
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}



            {/* Testimonial Detail Modal */}
            {showDetailModal && selectedTestimonial && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 max-w-md w-full relative">
                        <button
                            onClick={() => setShowDetailModal(false)}
                            className="absolute top-3 right-3"
                        >
                            <XMarkIcon className="w-6 h-6 text-yellow-400" />
                        </button>
                        <img
                            src={selectedTestimonial.profile_pic_url}
                            alt={selectedTestimonial.person_name}
                            className="w-24 h-24 object-cover rounded-full mb-4 mx-auto border border-yellow-400"
                        />
                        <h3 className="text-xl text-white font-semibold mb-2">{selectedTestimonial.person_name}</h3>
                        <p className="text-yellow-400 mb-2">Rating: {selectedTestimonial.rating}/5</p>
                        <p className="text-gray-300">{selectedTestimonial.review}</p>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-yellow-400 rounded-lg p-6 w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">Delete this testimonial?</h3>
                        <img
                            src={selectedTestimonial.profile_pic_url}
                            alt="Profile preview"
                            className="w-24 h-24 object-cover rounded-full mb-4 border border-yellow-400 mx-auto"
                        />
                        <p className="text-gray-300 mb-4">{selectedTestimonial.person_name}</p>
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

        </div>
    );
};

export default TestimonialSection;
