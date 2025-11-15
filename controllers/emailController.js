const Booking = require('../models/Booking'); // Adjust path if needed
const Email = require('../models/Email'); // adjust path as needed


const SibApiV3Sdk = require('sib-api-v3-sdk');   // Use require for the Brevo SDK
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file
// Set up Brevo API client
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();




exports.sendEmail = async (req, res) => {
  // Destructure variables from req.body
  const { to, subject, htmlContent} = req.body;

  console.log("Body: ", req.body)

  console.log("API KEY: ", process.env.BREVO_API_KEY)

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
  }

  catch (error) {
    console.error("Full error:", error.response ? error.response.body : error);
    res.status(500).json({
      message: "Error sending email",
      error: error.response ? error.response.body : error.message
    });
  }

};



exports.fetchEmails = async (req, res) => {
  try {
    // Find all documents but only select the 'userEmail' field
    const emails = await Booking.find({}, 'userEmail').lean();

    // Extract emails into a simple array
    const emailList = emails.map(e => e.userEmail);

    // Send response with status 200 (OK)
    return res.status(200).json({
      success: true,
      message: 'User emails fetched successfully',
      data: emailList,
    });
  } catch (error) {
    console.error('Error fetching user emails:', error);

    // Send error response with status 500 (Internal Server Error)
    return res.status(500).json({
      success: false,
      message: 'Error fetching user emails',
      error: error.message,
    });
  }
};


exports.sendBulkEmail = async (req, res) => {
  try {
    const { toList, subject, htmlContent } = req.body;

    // Validate request
    if (!toList || !Array.isArray(toList) || toList.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "'toList' (array of emails) is required" 
      });
    }
    if (!subject || !htmlContent) {
      return res.status(400).json({ 
        success: false, 
        message: "'subject' and 'htmlContent' are required" 
      });
    }

    // Clean HTML content: remove newlines & carriage returns
    const cleanedHtml = htmlContent.replace(/[\n\r]/g, '').trim();

    // Map recipients
    const recipients = toList.map(email => ({ email }));

    // Build the email object
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
      sender: { email: 'ayushkothari610@gmail.com', name: 'Aarna Enterprises' }, // verified sender
      to: recipients,
      subject: subject,
      htmlContent: cleanedHtml
    });

    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Emails sent response:", data); // debug info

    return res.status(200).json({
      success: true,
      message: `Emails sent successfully to ${toList.length} recipients`,
      data
    });

  } catch (error) {
    console.error("Error sending bulk emails:", error.response?.body || error);
    return res.status(500).json({
      success: false,
      message: "Error sending bulk emails",
      error: error.response?.body || error.message
    });
  }
};


exports.addEmailTemplate = async (req, res) => {
  try {
    const {
      bulk_email_subject,
      bulk_email_description,
      enq_success_subject,
      enq_fail_subject,
      enq_success_desc,
      enq_fail_desc,
      enq_auto_status,
      enq_submit_subject,
      enq_submit_desc,
      enq_submit_auto_status
    } = req.body;

    // Check if a template already exists — assuming only one global template
    let existingTemplate = await Email.findOne();

    let emailTemplate;

    if (existingTemplate) {
      // Update existing template
      existingTemplate.bulk_email_subject = bulk_email_subject ?? existingTemplate.bulk_email_subject;
      existingTemplate.bulk_email_description = bulk_email_description ?? existingTemplate.bulk_email_description;
      existingTemplate.enq_success_subject = enq_success_subject ?? existingTemplate.enq_success_subject;
      existingTemplate.enq_fail_subject = enq_fail_subject ?? existingTemplate.enq_fail_subject;
      existingTemplate.enq_success_desc = enq_success_desc ?? existingTemplate.enq_success_desc;
      existingTemplate.enq_fail_desc = enq_fail_desc ?? existingTemplate.enq_fail_desc;
      existingTemplate.enq_auto_status = enq_auto_status ?? existingTemplate.enq_auto_status;
      existingTemplate.enq_submit_subject = enq_submit_subject ?? existingTemplate.enq_submit_subject;
      existingTemplate.enq_submit_desc = enq_submit_desc ?? existingTemplate.enq_submit_desc;
      existingTemplate.enq_submit_auto_status = enq_submit_auto_status ?? existingTemplate.enq_submit_auto_status;

      emailTemplate = await existingTemplate.save();
    } else {
      // Create a new one
      emailTemplate = await Email.create({
        bulk_email_subject,
        bulk_email_description,
        enq_success_subject,
        enq_fail_subject,
        enq_success_desc,
        enq_fail_desc,
        enq_auto_status,
        enq_submit_subject,
        enq_submit_desc,
        enq_submit_auto_status
      });
    }

    return res.status(200).json({
      success: true,
      message: existingTemplate ? "Email template updated successfully" : "Email template created successfully",
      data: emailTemplate
    });

  } catch (error) {
    console.error("Error adding/updating email template:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding/updating email template",
      error: error.message
    });
  }
};



exports.fetchEmailTemplate = async (req, res) => {
    try {
        // Fetch the latest email template
        const template = await Email.findOne().sort({ createdAt: -1 }).lean();

        if (!template) {
            return res.status(404).json({ message: 'No email template found' });
        }

        // Send all fields as JSON
        return res.status(200).json({
            _id: template._id,
            bulk_email_subject: template.bulk_email_subject,
            bulk_email_description: template.bulk_email_description,
            enq_success_subject: template.enq_success_subject,
            enq_fail_subject: template.enq_fail_subject,
            enq_success_desc: template.enq_success_desc,
            enq_fail_desc: template.enq_fail_desc,
            enq_auto_status: template.enq_auto_status,
            enq_submit_subject: template.enq_submit_subject,
            enq_submit_desc: template.enq_submit_desc,
            enq_submit_auto_status: template.enq_submit_auto_status,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
            __v: template.__v
        });
    } catch (error) {
        console.error('Error fetching email template:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



exports.updateEmailTemplate = async (req, res) => {
    try {
        const { id } = req.params; // Template _id from URL
        const updateData = req.body; // Fields to update

        // Find template by ID and update it
        const updatedTemplate = await Email.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedTemplate) {
            return res.status(404).json({ message: 'Email template not found' });
        }

        return res.status(200).json({
            message: 'Email template updated successfully',
            template: updatedTemplate
        });
    } catch (error) {
        console.error('Error updating email template:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



exports.updateEmailTemplate = async (req, res) => {
    try {
        const updateData = req.body; // Fields to update

        // Find the latest template and update it
        const updatedTemplate = await Email.findOneAndUpdate(
            {},                  // empty filter: matches first document
            { $set: updateData }, 
            { new: true, runValidators: true } // return updated doc and validate
        ).lean();

        if (!updatedTemplate) {
            return res.status(404).json({ message: 'No email template found to update' });
        }

        return res.status(200).json({
            message: 'Email template updated successfully',
            template: updatedTemplate
        });
    } catch (error) {
        console.error('Error updating email template:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};