const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      unique: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    packageDescription: {
      type: String,
      trim: true,
    },
    price: {
      type: Number, // better as a Number instead of String
      required: true,
      min: 0,
    },
    thumbnail_url: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', PackageSchema);
