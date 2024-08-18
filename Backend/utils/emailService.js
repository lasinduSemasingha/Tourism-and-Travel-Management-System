const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: 'travelmateofficial2024@outlook.com', // Replace with your email
        pass: 'travel1234//'   // Replace with your email password or use environment variables
    }
});

const sendConfirmationEmail = (customerEmail, reservationDetails, status) => {
    // Define the subject and text based on the reservation status
    let subject;
    let text;

    if (status === 'confirmed') {
        subject = 'Reservation Confirmed';
        text = `Dear ${reservationDetails.userName}, \n\nYour reservation at ${reservationDetails.destinationName} has been confirmed! \n\nCheck-in Date: ${reservationDetails.fromDate} \nCheck-out Date: ${reservationDetails.toDate}\n\nThank you for booking with us!`;
    } else if (status === 'cancelled') {
        subject = 'Reservation Cancelled';
        text = `Dear ${reservationDetails.userName}, \n\nWe regret to inform you that your reservation at ${reservationDetails.destinationName} has been cancelled. \n\nCheck-in Date: ${reservationDetails.fromDate} \nCheck-out Date: ${reservationDetails.toDate}\n\nIf you have any questions, please contact us.\n\nThank you.`;
    } else {
        return; // Exit if the status is not recognized
    }

    const mailOptions = {
        from: 'travelmateofficial2024@outlook.com', // Sender address
        to: customerEmail,            // List of recipients
        subject: subject,            // Subject line
        text: text                   // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendConfirmationEmail;
