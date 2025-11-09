const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); // Import the sendEmail function


// POST route to send email
router.post('/send-email', emailController.sendEmail);

module.exports = router; 
