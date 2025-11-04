const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  banners: { type: [String], required: true }, // Array of banner URLs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Banner", bannerSchema);
