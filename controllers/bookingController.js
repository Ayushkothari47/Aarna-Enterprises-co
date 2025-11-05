const Booking = require("../models/PackageBooking");

exports.packageBooking = async (req, res) => {
  try {
    const {
      pickup,
      destination,
      date,
      time,
      userName,
      userEmail,
      userContact
    } = req.body;

    // Validate required fields
    if (!pickup || !destination || !date || !time || !userName || !userEmail || !userContact) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const bookingId = Math.random().toString(36).substring(2, 12).toUpperCase();

    const newBooking = new Booking({
      bookingId, bookingType: 'Package', pickup, destination, date, time, status: 'Pending', userName,
      userEmail, userContact
    });

    await newBooking.save();
    res.status(201).json({
      message: 'Package booked successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


