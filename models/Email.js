const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  bulk_email_subject: String,
  bulk_email_description: String,
  enq_success_subject : String, //Booking confirm subj
  enq_fail_subject : String,  //Booking fail desc
  enq_success_desc : String,  //Booking confirm desc
  enq_fail_desc : String,     //Booking failed desc
  enq_auto_status: {type: Boolean, default: true},
  enq_submit_subject : String,
  enq_submit_desc : String,
  enq_submit_auto_status : {type: Boolean, default: true}

}, { timestamps: true });

module.exports = mongoose.model('Email', EmailSchema);
