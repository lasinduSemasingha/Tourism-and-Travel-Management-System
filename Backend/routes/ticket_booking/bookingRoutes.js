const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/ticket_booking/bookingController')

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);

module.exports = router;
