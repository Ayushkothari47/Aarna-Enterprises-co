import { useEffect, useState } from "react";
import api from "../api/api";
import { ToastContainer, toast } from 'react-toastify';

export default function AdminManagement() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        adminName: "",
        email: "",
        contact: "",
        password: "",
    });

    // Fetch admins from backend
    const fetchAdmins = async () => {
        try {
            setUploading(true);
            const res = await api.get("/admin/fetchAllAdmins");

            setAdmins(res.data.data || []);
            setUploading(false);
        } catch (err) {
            toast.error("Error fetching admins:", err)
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    // Add new admin
    const handleAddAdmin = async () => {
        try {
            setUploading(true);
            const res = await api.post("/admin/admin-register", form);

            if (res.status === 200) {
                toast.success("Admin Added Successfully!");
            } else {
                toast.error("Something went wrong!");
            }
            setUploading(false);
            setShowModal(false);   // CLOSE modal after success or error

            // Refresh list
            fetchAdmins();

            // Clear form
            setForm({
                adminName: "",
                email: "",
                contact: "",
                password: "",
            });

        } catch (err) {
            toast.error("Error adding admin:", err);
            setUploading(false);

        }
    };


    return (
        <div className="min-h-screen bg-black text-yellow-500 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
                >
                    + Add Admin
                </button>
            </div>


            {/* 👇 Spinner overlay when uploading */}
            {uploading && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-[100]">
                    <div className="loader border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin mb-6"></div>
                    <p className="text-white text-xl font-semibold tracking-wide">
                        Processing...
                    </p>
                </div>
            )}

            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full text-left border border-yellow-400 rounded overflow-hidden">
                    <thead className="bg-yellow-500 text-black">
                        <tr>
                            <th className="p-3">S.No</th>
                            <th className="p-3">Admin ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr
                                key={admin._id}
                                className="border-t border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                            >
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{admin.adminId}</td>
                                <td className="p-3">{admin.adminName}</td>
                                <td className="p-3">{admin.email}</td>
                                <td className="p-3">{admin.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {admins.map((admin, index) => (
                    <div
                        key={admin._id}
                        className="border border-yellow-400 p-4 rounded bg-black shadow-lg"
                    >
                        <p><span className="font-bold">S.No:</span> {index + 1}</p>
                        <p><span className="font-bold">Admin ID:</span> {admin.adminId}</p>
                        <p><span className="font-bold">Name:</span> {admin.adminName}</p>
                        <p><span className="font-bold">Email:</span> {admin.email}</p>
                        <p><span className="font-bold">Contact:</span> {admin.contact}</p>
                    </div>
                ))}
            </div>


            {/* Add Admin Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
                    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md border border-yellow-400">
                        <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>

                        <div className="space-y-3">
                            <input
                                className="w-full p-2 rounded bg-black border border-yellow-400 text-yellow-400"
                                placeholder="Full Name"
                                value={form.adminName}
                                onChange={(e) => setForm({ ...form, adminName: e.target.value })}
                            />

                            <input
                                type="email"
                                className="w-full p-2 rounded bg-black border border-yellow-400 text-yellow-400"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />

                            <input
                                className="w-full p-2 rounded bg-black border border-yellow-400 text-yellow-400"
                                placeholder="Contact"
                                value={form.contact}
                                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                            />

                            <input
                                type="password"
                                className="w-full p-2 rounded bg-black border border-yellow-400 text-yellow-400"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />

                            <input
                                type="password"
                                className="w-full p-2 rounded bg-black border border-yellow-400 text-yellow-400"
                                placeholder="Confirm Password"
                                value={form.confirmPassword || ""}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end mt-5 gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-700 text-yellow-400 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    // Validation
                                    if (!form.adminName || !form.email || !form.contact || !form.password || !form.confirmPassword) {
                                        toast.error("Please fill all fields!");
                                        return;
                                    }
                                    if (!/\S+@\S+\.\S+/.test(form.email)) {
                                        toast.error("Please enter a valid email!");
                                        return;
                                    }
                                    if (form.password !== form.confirmPassword) {
                                        toast.error("Passwords do not match!");
                                        return;
                                    }

                                    handleAddAdmin();
                                }}
                                className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
