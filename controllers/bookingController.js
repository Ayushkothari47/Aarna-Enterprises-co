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
        // Prepare all placeholders used in your template
        const placeholders = {
          userName,
          userEmail,       // added
          userContact,     // added
          date,
          time,
          totalPassengers,
          bookingId: `Your Booking ID is: ${bookingId}`
        };

        // Replace placeholders in subject and HTML content
        const subject = fillPlaceholders(
          emailTemplates.enq_submit_subject || 'Booking Received',
          placeholders
        );

        const htmlContent = fillPlaceholders(
          emailTemplates.enq_submit_desc || emailTemplates.enq_submit_desc, // full HTML template
          placeholders
        );

        // Send email
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

    // --- SEND EMAIL AFTER BOOKING ---
    const emailTemplates = await Email.findOne(); // fetch your templates
    if (emailTemplates && emailTemplates.enq_submit_auto_status) {
      try {
        // Prepare all placeholders used in your template
        const placeholders = {
          userName,
          userEmail,       // added
          userContact,     // added
          date,
          time,
          totalPassengers,
          bookingId: `Your Booking ID is: ${bookingId}`
        };

        // Replace placeholders in subject and HTML content
        const subject = fillPlaceholders(
          emailTemplates.enq_submit_subject || 'Booking Received',
          placeholders
        );

        const htmlContent = fillPlaceholders(
          emailTemplates.enq_submit_desc || emailTemplates.enq_submit_desc, // full HTML template
          placeholders
        );

        // Send email
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
    const { bookingId } = req.params;
    const { status } = req.body;  // Only extract status


    if (!bookingId) {
      return res.status(400).json({ success: false, message: "Booking ID is required." });
    }

    if (!status) {
      return res.status(400).json({ success: false, message: "Status field is required." });
    }

    // Only allow valid status values
    const allowedStatuses = ["Pending", "Approved", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    // Update only status field
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    // --- SEND EMAIL IF STATUS CHANGED ---
    if (["Approved", "Rejected"].includes(status)) {
      const emailTemplates = await Email.findOne();
      if (emailTemplates) {
        const placeholders = {
          userName: updatedBooking.userName,
          userEmail: updatedBooking.userEmail,
          userContact: updatedBooking.userContact,
          bookingId: `Your Booking ID is: ${updatedBooking.bookingId}`,
          bookingName: updatedBooking.bookingName,
          pickup: updatedBooking.pickup,
          destination: updatedBooking.destination,
          date: updatedBooking.date,
          time: updatedBooking.time,
          totalPassengers: updatedBooking.totalPassengers,
          status: updatedBooking.status
        };

        let htmlTemplate = "";
        let subject = "";

        if (status === "Approved") {
          console.log("Approved mail sent")
          htmlTemplate = emailTemplates.enq_success_desc;
          subject = emailTemplates.enq_success_subject;
        } else if (status === "Rejected") {
          console.log("Rejected mail sent")
          htmlTemplate = emailTemplates.enq_fail_desc;
          subject = emailTemplates.enq_fail_subject;
        }

        const finalSubject = fillPlaceholders(subject, placeholders);
        const finalHtml = fillPlaceholders(htmlTemplate, placeholders);

        try {
          await sendEmailInternal({
            to: updatedBooking.userEmail,
            subject: finalSubject,
            htmlContent: finalHtml
          });
          console.log("Booking status email sent to", updatedBooking.userEmail);
        } catch (emailErr) {
          console.error("Error sending booking status email:", emailErr);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully.",
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
    const { status } = req.body; // Only accept status

    console.log("Package Status updated req :  ", status)

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required."
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status field is required."
      });
    }

    // Allow only valid statuses
    const allowedStatuses = ["Pending", "Approved", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value."
      });
    }

    // Update ONLY the status field
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found."
      });
    }

    // --- SEND EMAIL IF STATUS CHANGED TO Approved OR Rejected ---
    if (["Approved", "Rejected"].includes(status)) {
      try {
        const emailTemplates = await Email.findOne();

        if (emailTemplates) {
          const placeholders = {
            userName: updatedBooking.userName,
            userEmail: updatedBooking.userEmail,
            userContact: updatedBooking.userContact,
            bookingName: updatedBooking.bookingName,
            bookingId: updatedBooking.bookingId,
            pickup: updatedBooking.pickup,
            destination: updatedBooking.destination || "AS PER PACKAGE",
            date: updatedBooking.date,
            time: updatedBooking.time,
            totalPassengers: updatedBooking.totalPassengers,
            status: updatedBooking.status
          };

          let subject = "";
          let htmlContent = "";

          // SELECT TEMPLATE BASED ON STATUS
          if (status === "Approved") {
            subject = fillPlaceholders(
              emailTemplates.enq_success_subject || "Package Booking Approved",
              placeholders
            );

            htmlContent = fillPlaceholders(
              emailTemplates.enq_success_desc || "<p>Your package booking has been approved.</p>",
              placeholders
            );

          } else if (status === "Rejected") {
            subject = fillPlaceholders(
              emailTemplates.enq_fail_subject || "Package Booking Rejected",
              placeholders
            );

            htmlContent = fillPlaceholders(
              emailTemplates.enq_fail_desc || "<p>Your package booking has been rejected.</p>",
              placeholders
            );
          }

          // Send email
          await sendEmailInternal({
            to: updatedBooking.userEmail,
            subject,
            htmlContent
          });

          console.log(`Package booking ${status} email sent to`, updatedBooking.userEmail);
        }
      } catch (emailErr) {
        console.error("Error sending package booking email:", emailErr);
      }
    }

    res.status(200).json({
      success: true,
      message: "Package booking status updated successfully.",
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

