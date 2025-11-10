const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); // Import the sendEmail function


// POST route to send email
router.post('/send-email', emailController.sendEmail);
router.get('/fetch-emails', emailController.fetchEmails);
router.post('/send-bulk', emailController.sendBulkEmail);
router.post('/add-email-template', emailController.addEmailTemplate);

module.exports = router; 
