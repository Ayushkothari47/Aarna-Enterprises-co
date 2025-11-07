const Package = require('../models/Package');
const Booking = require('../models/Booking');

exports.makePackageBooking = async (req, res) => {
  try {
    const {
      bookingId,
      pickup,
      date,
      time,
      totalPassengers,
      userName,
      userEmail,
      userContact
    } = req.body;

    // Validate required fields
    if (!bookingId || !pickup || !date || !time || !userName || !userEmail || !userContact) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Fetch package data
    const selectedPackage = await Package.findOne({ packageId: bookingId });
    if (!selectedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Use the package's name as the booking name
    const bookingName = selectedPackage.packageName;


    // Create booking record
    const newBooking = new Booking({
      bookingId,
      bookingName,         // 'Package Book' or actual package name
      pickup,
      destination: 'NA',   // since package defines its route
      date,
      time,
      totalPassengers,
      tripType: 'NA',
      carType: 'NA',
      status: 'Pending',
      userName,
      userEmail,
      userContact
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Package booked successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error creating package booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Helper function to generate 10-character random alphanumeric uppercase ID
const generateBookingId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

exports.makeRideBooking = async (req, res) => {
  try {
    const {
      pickup,
      destination,
      date,
      time,
      totalPassengers,
      tripType,
      carType,
      userName,
      userEmail,
      userContact
    } = req.body;

    // ✅ Validate required fields
    if (
      !pickup ||
      !destination ||
      !date ||
      !time ||
      !tripType ||
      !carType ||
      !userName ||
      !userEmail ||
      !userContact
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Generate a unique 10-character booking ID
    const bookingId = generateBookingId();

    // ✅ Create a new booking document
    const newBooking = new Booking({
      bookingId,
      bookingName: 'Ride Booking',
      pickup,
      destination,
      date,
      time,
      totalPassengers,
      tripType,
      carType,
      status: 'Pending',
      userName,
      userEmail,
      userContact
    });

    await newBooking.save();

    // ✅ Send response
    res.status(201).json({
      message: 'Ride booked successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error creating ride booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};