const SibApiV3Sdk = require('sib-api-v3-sdk');   // Use require for the Brevo SDK
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file
// Set up Brevo API client
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmailInternal = async ({ to, subject, htmlContent }) => {
  if (!to) throw new Error("Recipient email ('to') is required");

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: 'ayushkothari610@gmail.com' };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully!', data);
    return data;
  } catch (error) {
    console.error("Full error:", error.response ? error.response.body : error);
    throw error.response ? error.response.body : error;
  }
};

module.exports = { sendEmailInternal };