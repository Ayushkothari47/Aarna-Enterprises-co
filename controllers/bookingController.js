const Package = require('../models/Package');
const Booking = require('../models/Booking');
const Email = require('../models/Email');
const { sendEmailInternal } = require('../services/emailService');

// Helper to replace placeholders
function fillPlaceholders(template, data) {
  let result = template;
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, data[key]);
  }
  return result;
}


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

    // --- SEND EMAIL AFTER BOOKING ---
    const emailTemplates = await Email.findOne(); // fetch your templates
    if (emailTemplates && emailTemplates.enq_submit_auto_status) {
      try {
        const placeholders = {
          userName,
          bookingName,
          pickup,
          destination: 'AS PER PACKAGE',
          date,
          time,
          totalPassengers
        };

        const subject = fillPlaceholders(emailTemplates.enq_submit_subject || 'Booking Received', placeholders);
        const htmlContent = fillPlaceholders(emailTemplates.enq_submit_desc || '<p>We received your booking!</p>', placeholders);

        await sendEmailInternal({
          to: userEmail,
          subject,
          htmlContent
        });

        console.log('Booking confirmation email sent to', userEmail);
      } catch (emailErr) {
        console.error('Error sending booking email:', emailErr);
      }
    }


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



exports.getAllRides = async (req, res) => {
  try {

    const rides = await Booking.find({ bookingId: { $not: /^PKG_/ } }).sort({ createdAt: -1 });

    if (!rides.length) {
      return res.status(404).json({ message: "No Rides found." });
    }

    res.status(200).json({
      message: "✅ Rides fetched successfully",
      count: rides.length,
      data: rides,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages", error: error.message });
  }
};


exports.getAllPackages = async (req, res) => {
  try {
    // Fetch only documents where bookingId starts with "PKG_"
    const packages = await Booking.find({ bookingId: { $regex: /^PKG_/ } }).sort({ createdAt: -1 });

    if (!packages.length) {
      return res.status(404).json({ message: "No Packages found." });
    }

    res.status(200).json({
      message: "✅ Packages fetched successfully",
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages", error: error.message });
  }
};


// PUT /api/bookings/:bookingId
exports.updateRideBooking = async (req, res) => {
  try {
    const { bookingId } = req.params; // from URL params
    const updateData = req.body; // fields to update

    // Validate if bookingId is provided
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required."
      });
    }

    // Find and update booking
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },              // find booking by bookingId field
      { $set: updateData },       // apply updates
      { new: true, runValidators: true } // return updated doc
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Ride booking updated successfully.",
      data: updatedBooking
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating booking.",
      error: error.message
    });
  }
};



// PUT /api/package-bookings/:bookingId
exports.updatePackageBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    let updateData = { ...req.body }; // clone body

    // Validate if bookingId is provided
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required."
      });
    }

    // Remove fields that cannot be updated
    delete updateData.bookingId;
    delete updateData.bookingName;

    // Find and update booking
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Package booking updated successfully.",
      data: updatedBooking
    });
  } catch (error) {
    console.error("Error updating package booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating package booking.",
      error: error.message
    });
  }
};
