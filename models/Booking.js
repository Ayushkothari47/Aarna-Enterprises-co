const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: String,
  bookingName: String,  //Ride Book or Package Book
  pickup: String,
  destination: String,
  date: String,
  time: String,
  totalPassengers: Number,
  tripType: String,
  carType: String,
  status: { type: String, default: 'Pending'},
  userName: String,
  userEmail: String,
  userContact: String
}, 
{ timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
