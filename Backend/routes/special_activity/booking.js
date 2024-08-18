const express = require('express');
const router = express.Router();
const Booking = require('../../models/special_activity/Booking');
const bookingController = require('../../controllers/ticket_booking/bookingController'); // Adjust path as necessary

// Add new Booking
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); 

// Get Bookings by User ID
router.get('/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this user' });
        }
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Booking by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Ensure validators are run on the update
        });

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to count bookings by userId
router.get('/count/:userId', bookingController.countBookingsByUserId);

module.exports = router;
