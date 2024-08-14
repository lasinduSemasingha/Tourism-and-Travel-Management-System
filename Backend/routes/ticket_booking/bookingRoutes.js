const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/ticket_booking/bookingController')

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings)
router.get('/user/:userId', bookingController.getBookingsByUserId)


// Route to update a ticket by ID
router.put('/:id', bookingController.updateBooking);

// Route to delete a ticket by ID
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
