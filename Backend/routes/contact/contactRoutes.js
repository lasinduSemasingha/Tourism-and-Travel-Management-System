const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contact/contactController');

// @route   POST /api/contact
// @desc    Submit contact form
router.post('/', contactController.submitContactForm);

// @route   GET /api/contact
// @desc    Get all contact form submissions (admin only)
// You may need to add an authentication middleware for admin access
router.get('/', contactController.getAllContacts);

module.exports = router;
