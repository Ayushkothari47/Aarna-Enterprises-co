const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  about: String,
  owner_name: String,
  owner_img_url: String,
  address_line_1: String,
  address_line_2: String,
  g_map_url: String,
  email: String,
  phone_1: String,
  phone_2: String,
  facebook_url: String,
  twitter_url: String,
  insta_url: String,
  linkedIn_url : String,
  youtube_url : String,
  rating: String,
  copyright_year : String,
}, 
{ timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
