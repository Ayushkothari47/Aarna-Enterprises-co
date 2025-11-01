const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  imgId: String,
  url: String,
  author: { type: String, default: 'Anonymous' },
  isApproved: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model('Image', uploadSchema);
