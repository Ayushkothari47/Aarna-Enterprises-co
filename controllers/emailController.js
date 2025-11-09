const SibApiV3Sdk = require('sib-api-v3-sdk');   // Use require for the Brevo SDK
const dotenv = require('dotenv');   

dotenv.config();  // Load environment variables from .env file

// Set up Brevo API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = "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"; // Use the API key from your .env

exports.sendEmail = async (req, res) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: 'ayushkothari610@gmail.com' }; // Your sender email
  sendSmtpEmail.to = [{ email: req.body.to }]; // Recipient email from request
  sendSmtpEmail.subject = req.body.subject || 'Test Email from Brevo';
  sendSmtpEmail.htmlContent = req.body.htmlContent || '<html><body><h1>This is a test email</h1></body></html>';

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};