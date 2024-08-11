const express = require('express');
const router = express.Router();
const bookedController = require('../../controllers/ticket_booking/bookingController');
const { protect } = require('../../middleware/authMiddleware'); // Middleware to protect routes

router.get('/', protect, bookedController.getBookings);

module.exports = router;
