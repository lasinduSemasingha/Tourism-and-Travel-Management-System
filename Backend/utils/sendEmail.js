const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Outlook365', // or use another email service
      auth: {
        user: 'travelmateofficial2024@outlook.com', // replace with your email
        pass: 'travel1234//', // replace with your email password or app-specific password
      },
    });

    await transporter.sendMail({
      from: 'travelmateofficial2024@outlook.com', // replace with your email
      to,
      subject,
      text,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
