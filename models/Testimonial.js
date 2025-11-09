const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  testimonial_Id: String,
  profile_pic_url: String,
  profile_pic_public_id: String, // <— added this
  person_name: String,
  rating: Number,
  review: String,
  isVisible: { type: Boolean, default: true }
}, 
{ timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
