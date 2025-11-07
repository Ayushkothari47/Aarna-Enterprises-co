const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/bookPackage', bookingController.makePackageBooking);
router.post('/bookRide', bookingController.makeRideBooking);
router.get('./getAllRideBooings',bookingController.getAllRides);
router.get('./getAllPackageBookings',bookingController.getAllPackages);

module.exports = router;
