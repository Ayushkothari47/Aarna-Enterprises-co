const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/bookPackage', bookingController.makePackageBooking);
router.post('/bookRide', bookingController.makeRideBooking);
router.get('/getAllRideBookings', bookingController.getAllRides);
router.get('/getAllPackageBookings', bookingController.getAllPackages);
router.put('/bookings/:bookingId', bookingController.updateRideBooking);
router.put('/package-bookings/:bookingId', bookingController.updatePackageBooking);



module.exports = router;
