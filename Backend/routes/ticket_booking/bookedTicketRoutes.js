const express = require('express');
const router = express.Router();
const bookedController = require('../../controllers/ticket_booking/bookingController');

router.get('/bookings/user/:userId', bookedController.getBookingsByUserId);

module.exports = router;
