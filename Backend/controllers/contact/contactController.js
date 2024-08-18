const Contact = require('../../models/contact/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = new Contact({
            name,
            email,
            subject,
            message,
        });

        await contact.save();

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error submitting contact form', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

// @desc    Get all contact form submissions (for admin)
// @route   GET /api/contact
// @access  Private (Admin)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contact submissions', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};
