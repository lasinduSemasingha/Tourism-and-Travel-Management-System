const nodemailer = require('nodemailer');
const Admin = require('../models/user_managemnt/admin'); // Adjust the path

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: 'travelmateofficial2024@outlook.com',
    pass: 'travel1234//'
  }
});

// Function to send restock alert
const sendRestockAlert = async (itemNames) => {
  try {
    // Fetch the email of the Item Manager
    const itemManager = await Admin.findOne({ name: 'Item Manager' });

    if (!itemManager) {
      console.log('No Item Manager found.');
      return;
    }

    // Define the email content
    const mailOptions = {
      from: 'travelmateofficial2024@outlook.com',
      to: itemManager.email,
      subject: 'Restock Alert: Items Low on Stock',
      text: `The following items are low on stock: ${itemNames}. Please restock them as soon as possible.`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Restock alert sent successfully.');
  } catch (error) {
    console.error('Error sending restock alert:', error);
  }
};

module.exports = { sendRestockAlert };
