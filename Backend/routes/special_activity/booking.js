const express = require('express');
const router = express.Router();
const Booking =  require('../../models/special_activity/Booking');

//add new Booking
router.post('/', async (req, res) => {
    try {
      const newBooking = new Booking(req.body);
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

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

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId: userId });

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this user' });
        }

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;