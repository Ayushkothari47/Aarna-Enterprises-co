const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  banners: { type: [String], required: true }, // Array of banner URLs
  isVisible: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MobileBanner", bannerSchema);
