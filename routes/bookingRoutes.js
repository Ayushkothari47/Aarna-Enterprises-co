const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/bookPackage', bookingController.packageBooking);

module.exports = router;
