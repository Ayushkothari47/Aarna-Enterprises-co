const Package = require('../models/Package');
const Booking = require('../models/Booking');

exports.makePackageBooking = async (req, res) => {
  try {
    const {
      bookingId,        // This will also serve as bookingId
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
    const selectedPackage = await Package.findById(bookingId);
    if (!selectedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Extract booking name from package
    const bookingName = selectedPackage.name; // assuming 'name' field exists in Package model

    // Create booking record
    const newBooking = new Booking({
      bookingId: bookingId,         // bookingId same as bookingId
      bookingType: 'Package',
      bookingName,
      pickup,
      destination: 'NA',            // package already defines its destination internally
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
