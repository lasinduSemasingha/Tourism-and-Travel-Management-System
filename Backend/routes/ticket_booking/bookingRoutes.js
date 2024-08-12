const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/ticket_booking/bookingController')

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings)
router.get('/user/:userId', bookingController.getBookingsByUserId)

module.exports = router;
