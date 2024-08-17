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

// Get Booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
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


// Route to count bookings by userId
router.get('/count/:userId', bookingController.countBookingsByUserId);

module.exports = router;
