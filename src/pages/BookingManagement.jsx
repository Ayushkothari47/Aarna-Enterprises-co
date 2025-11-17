import React, { useEffect, useState } from "react";
import api from '../api/api';


const rideUpdateAPI = "/booking/updateRideBookings";
const packageUpdateAPI = "/booking/updatePackageBookings";


function BookingManagement() {
  const [activeTab, setActiveTab] = useState("package");
  const [packageBookings, setPackageBookings] = useState([]);
  const [rideBookings, setRideBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const allBookings = [...packageBookings, ...rideBookings];
  const [mobileSearch, setMobileSearch] = useState("");



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
      const res = await api.get("/booking/getAllPackageBookings");
      setPackageBookings(res.data.data);
    } catch (err) {
      console.error("Error fetching package bookings", err);
    }
  };

  const fetchRideBookings = async () => {
    try {
      const res = await api.get("/booking/getAllRideBookings");
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
      const search = mobileSearch; // use local mobile search
      return (
        b.bookingName.toLowerCase().includes(filters.bookingName) &&
        b.pickup.toLowerCase().includes(filters.pickup) &&
        b.destination.toLowerCase().includes(filters.destination) &&
        b.date.toLowerCase().includes(filters.date) &&
        b.time.toLowerCase().includes(filters.time) &&
        String(b.totalPassengers).includes(filters.totalPassengers) &&
        b.status.toLowerCase().includes(filters.status) &&

        // 🔥 Mobile Search (name, package, contact, date)
        (
          b.bookingName.toLowerCase().includes(search) ||
          b.userName?.toLowerCase().includes(search) ||
          b.userContact?.toLowerCase().includes(search) ||
          b.date.toLowerCase().includes(search)
        )
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
                { key: "bookingName", placeholder: "Search name", type: "text" },
                { key: "pickup", placeholder: "Search pickup", type: "text" },
                { key: "destination", placeholder: "Search destination", type: "text" },
                { key: "date", placeholder: "Search date", type: "date" },
                { key: "time", placeholder: "Search time", type: "time" },
                { key: "totalPassengers", placeholder: "Passengers", type: "text" },
                { key: "status", type: "select" }

              ].map((col) => (
                <th key={col.key} className="px-2 py-2">
                  {col.key === "status" ? (
                    <select
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 
               focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm"
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <input
                      type={col.type}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 
               focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm"
                      placeholder={col.placeholder}
                      onChange={(e) => handleFilterChange(col.key, e.target.value)}
                    />
                  )}

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
                ${booking.status === "Approved"
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


  const renderMobileCards = (bookings) => {
    if (bookings.length === 0)
      return <p className="text-white mt-4">No bookings found.</p>;

    // 🔍 MOBILE SEARCH FILTER
    const filteredBookings = bookings.filter((b) => {
      const s = mobileSearch.toLowerCase();

      return (
        // MOBILE SEARCH CONDITIONS
        (b.bookingName?.toLowerCase().includes(s) ||
          b.userName?.toLowerCase().includes(s) ||
          b.userContact?.toLowerCase().includes(s) ||
          b.date?.toLowerCase().includes(s)) &&

        // DESKTOP FILTERS SHOULD NOT AFFECT MOBILE (OPTIONAL)
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
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking._id}
            onClick={() => handleRowClick(booking)}
            className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700 
                     hover:bg-gray-700 transition cursor-pointer"
          >
            <p><span className="text-gray-400">User:</span> {booking.userName}</p>
            <p><span className="text-gray-400">Contact:</span> {booking.userContact}</p>
            <p><span className="text-gray-400">Package:</span> {booking.bookingName}</p>
            <p><span className="text-gray-400">Persons:</span> {booking.totalPassengers}</p>
            <p><span className="text-gray-400">Date:</span> {booking.date}</p>
          </div>
        ))}
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

      const res = await api.put(updateURL, { status: newStatus });

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
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-yellow-400 text-center">
        Booking Management
      </h1>

      {/* Tabs */}
      {/* Tabs (Glassmorphism) */}
      <div className="flex space-x-3 mb-6 backdrop-blur-lg">
        {[
          { key: "all", label: "All" },
          { key: "package", label: "Package Bookings" },
          { key: "ride", label: "Ride Bookings" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all border 
        ${activeTab === tab.key
                ? "bg-white/20 text-yellow-400 border-yellow-400 shadow-lg"
                : "bg-white/10 text-gray-300 border-gray-600 hover:bg-white/20"
              }
      `}
          >
            {tab.label}
          </button>
        ))}
      </div>



      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            {activeTab === "package"
              ? renderTable(packageBookings)
              : activeTab === "ride"
                ? renderTable(rideBookings)
                : renderTable(allBookings)}
          </div>

          {/* Mobile Cards */}
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">

            {/* 🔍 Mobile Search Bar */}
            <input
              type="text"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value.toLowerCase())}
              placeholder="Search bookings..."
              className="w-full bg-gray-800 text-yellow-400 px-4 py-3 rounded-xl 
               border border-gray-700 focus:border-yellow-400 
               focus:ring-1 focus:ring-yellow-400 outline-none 
               placeholder-yellow-400"
            />

            {/* Mobile Cards render */}
            {activeTab === "package"
              ? renderMobileCards(packageBookings)
              : activeTab === "ride"
                ? renderMobileCards(rideBookings)
                : renderMobileCards(allBookings)}
          </div>

        </>
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
