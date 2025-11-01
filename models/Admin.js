const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminId: String,
  adminName: String,
  email: String,
  contact:String,
  password: String,
}, 
{ timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
