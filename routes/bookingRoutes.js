const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');

router.post('/bookPackage', bookingController.makePackageBooking);
router.post('/bookRide', bookingController.makeRideBooking);
router.get('/getAllRideBookings', bookingController.getAllRides);
router.get('/getAllPackageBookings', bookingController.getAllPackages);
router.put('/updateRideBookings/:bookingId',auth, bookingController.updateRideBooking);
router.put('/updatePackageBookings/:bookingId',auth, bookingController.updatePackageBooking);



module.exports = router;
