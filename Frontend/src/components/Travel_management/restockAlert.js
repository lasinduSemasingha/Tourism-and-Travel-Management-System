const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Set up Mongoose models
const Item = mongoose.model('item', new mongoose.Schema({
  name: String,
  stock: Number
}));

const Admin = mongoose.model('admin', new mongoose.Schema({
  name: String,
  email: String,
  role: String
}));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Outlook365', // or your email service
  auth: {
    user: 'travelmateofficial2024@outlook.com',
    pass: 'travel1234//'
  }
});

const sendRestockAlert = async () => {
  try {
    // Fetch items with stock below 5
    const lowStockItems = await Item.find({ stock: { $lt: 5 } });

    if (lowStockItems.length === 0) {
      console.log('No items need restocking.');
      return;
    }

    // Fetch the email of the Item Manager
    const itemManager = await Admin.findOne({ role: 'Item Manager' });

    if (!itemManager) {
      console.log('No Item Manager found.');
      return;
    }

    const itemNames = lowStockItems.map(item => item.name).join(', ');

    // Send email alert
    const mailOptions = {
      from: 'travelmateofficial2024@outlook.com',
      to: itemManager.email,
      subject: 'Restock Alert: Items Low on Stock',
      text: `The following items are low on stock: ${itemNames}. Please restock them as soon as possible.`
    };

    await transporter.sendMail(mailOptions);

    console.log('Restock alert sent successfully.');
  } catch (error) {
    console.error('Error sending restock alert:', error);
  }
};

// Example usage
sendRestockAlert();
