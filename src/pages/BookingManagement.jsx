import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const fetchAllPackageBookings = `${SERVER_URL}/booking/getAllPackageBookings`;
const fetchAllRideBookings = `${SERVER_URL}/booking/getAllRideBookings`;
const rideUpdateAPI = `${SERVER_URL}/booking/updateRideBookings`;
const packageUpdateAPI = `${SERVER_URL}/booking/updatePackageBookings`;

function BookingManagement() {
  const [activeTab, setActiveTab] = useState("package");
  const [packageBookings, setPackageBookings] = useState([]);
  const [rideBookings, setRideBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [filters, setFilters] = useState({
    bookingName: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    totalPassengers: "",
    status: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value.toLowerCase() }));
  };


  


  const fetchPackageBookings = async () => {
    try {
      const res = await axios.get(fetchAllPackageBookings);
      setPackageBookings(res.data.data);
    } catch (err) {
      console.error("Error fetching package bookings", err);
    }
  };

  const fetchRideBookings = async () => {
    try {
      const res = await axios.get(fetchAllRideBookings);
      setRideBookings(res.data.data);
    } catch (err) {
      console.error("Error fetching ride bookings", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPackageBookings(), fetchRideBookings()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const hasPending = (bookings) =>
    bookings.some((booking) => booking.status === "Pending");

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
  };

  const renderTable = (bookings) => {
  if (bookings.length === 0)
    return <p className="text-white mt-4">No bookings found.</p>;

  // 🔥 Apply filters HERE
  const filteredBookings = bookings.filter(b => {
    return (
      b.bookingName.toLowerCase().includes(filters.bookingName) &&
      b.pickup.toLowerCase().includes(filters.pickup) &&
      b.destination.toLowerCase().includes(filters.destination) &&
      b.date.toLowerCase().includes(filters.date) &&
      b.time.toLowerCase().includes(filters.time) &&
      String(b.totalPassengers).includes(filters.totalPassengers) &&
      b.status.toLowerCase().includes(filters.status)
    );
  });

  return (
    <div className="overflow-x-auto">
  <table className="min-w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
    
    {/* Header */}
    <thead className="text-left text-sm uppercase tracking-wider">
      <tr className="bg-yellow-500 text-black">
        <th className="px-4 py-3">Name</th>
        <th className="px-4 py-3">Pickup</th>
        <th className="px-4 py-3">Destination</th>
        <th className="px-4 py-3">Date</th>
        <th className="px-4 py-3">Time</th>
        <th className="px-4 py-3">Passengers</th>
        <th className="px-4 py-3">Status</th>
      </tr>

      {/* Filter Inputs Row */}
      <tr className="bg-gray-800">
        {[
          { key: "bookingName", placeholder: "Search name" },
          { key: "pickup", placeholder: "Search pickup" },
          { key: "destination", placeholder: "Search destination" },
          { key: "date", placeholder: "Search date" },
          { key: "time", placeholder: "Search time" },
          { key: "totalPassengers", placeholder: "Passengers" },
          { key: "status", placeholder: "Status" }
        ].map((col) => (
          <th key={col.key} className="px-2 py-2">
            <input
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md placeholder-gray-400 
                        border border-gray-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 
                        transition-all text-sm"
              placeholder={col.placeholder}
              onChange={(e) => handleFilterChange(col.key, e.target.value)}
            />
          </th>
        ))}
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {filteredBookings.map((booking, idx) => (
        <tr
          key={booking._id}
          onClick={() => handleRowClick(booking)}
          className={`
            cursor-pointer transition-all
            ${idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
            hover:bg-gray-600
          `}
        >
          <td className="px-4 py-3">{booking.bookingName}</td>
          <td className="px-4 py-3">{booking.pickup}</td>
          <td className="px-4 py-3">{booking.destination}</td>
          <td className="px-4 py-3">{booking.date}</td>
          <td className="px-4 py-3">{booking.time}</td>
          <td className="px-4 py-3">{booking.totalPassengers}</td>

          <td className="px-4 py-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border 
                ${
                  booking.status === "Approved"
                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                    : booking.status === "Rejected"
                      ? "bg-red-500/20 text-red-400 border-red-500/50"
                      : "bg-yellow-400/20 text-yellow-400 border-yellow-400/50"
                }
              `}
            >
              {booking.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};


  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      // Decide correct API endpoint
      const updateURL =
        activeTab === "package"
          ? `${packageUpdateAPI}/${bookingId}`
          : `${rideUpdateAPI}/${bookingId}`;

      const res = await axios.put(updateURL, { status: newStatus });

      if (res.status === 200) {
        alert(`Booking ${newStatus} successfully!`);
        setSelectedBooking(null);

        // Refresh updated list
        if (activeTab === "package") {
          await fetchPackageBookings();
        } else {
          await fetchRideBookings();
        }
      }
    } catch (err) {
      console.error("Error updating booking status", err);
      alert("Failed to update status. Try again later.");
    }
  };



  return (
    <div className="bg-black min-h-screen p-4 md:p-8 text-white font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
        Booking Management
      </h1>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6 md:mb-8">
        <button
          onClick={() => setActiveTab("package")}
          className={`relative px-4 py-2 md:px-6 md:py-3 font-semibold rounded-full transition-colors duration-300 ${activeTab === "package"
            ? "bg-yellow-500 text-black shadow-lg"
            : hasPending(packageBookings)
              ? "bg-none text-white shadow-md"
              : "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
            }`}
        >
          Package Bookings
          {hasPending(packageBookings) && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("ride")}
          className={`relative px-4 py-2 md:px-6 md:py-3 font-semibold rounded-full transition-colors duration-300 ${activeTab === "ride"
            ? "bg-yellow-500 text-black shadow-lg"
            : hasPending(rideBookings)
              ? "bg-none text-white shadow-md"
              : "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
            }`}
        >
          Ride Bookings
          {hasPending(rideBookings) && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "package" ? (
        renderTable(packageBookings)
      ) : (
        renderTable(rideBookings)
      )}

      {/* Booking Details Modal */}
      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg w-full max-w-lg relative overflow-y-auto max-h-full">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-2 right-2 text-white font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl md:text-1xl font-bold mb-4">
              Booking ID - {selectedBooking.bookingId}
            </h2>
            <div className="space-y-2 text-white text-sm md:text-base">
              <p><strong>Name:</strong> {selectedBooking.bookingName}</p>
              <p><strong>Pickup:</strong> {selectedBooking.pickup}</p>
              <p><strong>Destination:</strong> {selectedBooking.destination}</p>
              <p><strong>Date:</strong> {selectedBooking.date}</p>
              <p><strong>Time:</strong> {selectedBooking.time}</p>
              <p><strong>Passengers:</strong> {selectedBooking.totalPassengers}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Trip Type:</strong> {selectedBooking.tripType || "-"}</p>
              <p><strong>Car Type:</strong> {selectedBooking.carType || "-"}</p>
              <p><strong>User Name:</strong> {selectedBooking.userName}</p>
              <p><strong>User Email:</strong> {selectedBooking.userEmail}</p>
              <p><strong>User Contact:</strong> {selectedBooking.userContact}</p>
              <p><strong>Created At:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(selectedBooking.updatedAt).toLocaleString()}</p>
            </div>

            {/* ✅ Approve / Reject Buttons */}
            {selectedBooking.status === "Pending" && (
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => handleStatusUpdate(selectedBooking.bookingId, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedBooking.bookingId, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default BookingManagement;
