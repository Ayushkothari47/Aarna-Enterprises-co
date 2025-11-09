const SibApiV3Sdk = require('sib-api-v3-sdk');   // Use require for the Brevo SDK
const dotenv = require('dotenv');   

dotenv.config();  // Load environment variables from .env file

// Set up Brevo API client
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY; 
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

exports.sendEmail = async (req, res) => {
  // Destructure variables from req.body
  const { to, subject = 'Test Email from Brevo', htmlContent = '<html><body><h1>This is a test email</h1></body></html>' } = req.body;

  console.log("Body: ",req.body)

  console.log("API KEY: ",process.env.BREVO_API_KEY)

  // Check if 'to' is provided
  if (!to) {
    return res.status(400).json({ message: "Recipient email ('to') is required" });
  }

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: 'ayushkothari610@gmail.com' }; // Sender email
  sendSmtpEmail.to = [{ email: to }]; // Recipient email
  sendSmtpEmail.subject = subject;     // Subject
  sendSmtpEmail.htmlContent = htmlContent; // HTML content

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
