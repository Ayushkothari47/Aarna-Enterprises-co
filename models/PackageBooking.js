const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: String,
  bookingType: String,  //Ride Book or Package Book
  pickup: String,
  destination: String,
  date: String,
  time: String,
  status: String,
  userName: String,
  userEmail: String,
  userContact: String
}, 
{ timestamps: true });

module.exports = mongoose.model('PackageBooking', BookingSchema);
