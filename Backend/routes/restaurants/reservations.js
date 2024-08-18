const express = require('express');
const router = express.Router();
const Reservation = require('../../models/restaurant/Rest_Reservation');
const auth = require('../../middlewares/auth');

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        if (reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found' });
        }
        res.status(200).json(reservations);
    } catch (err) {
        console.error('Error fetching all reservations', err);
        res.status(500).json({ error: 'Error fetching all reservations' });
    }
});


// Get reservations for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        console.log(`Fetching reservations for user ID: ${req.params.userId}`);
        const reservations = await Reservation.find({ userId: req.params.userId });
        if (reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found for this user' });
        }
        res.status(200).json(reservations);
    } catch (err) {
        console.error('Error fetching reservations', err);
        res.status(500).json({ error: 'Error fetching reservations' });
    }
});

// Update a reservation
router.put('/:id', async (req, res) => {
    const { date, numOfPeople } = req.body;
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { date, numOfPeople }, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (err) {
        console.error('Error updating reservation', err);
        res.status(500).json({ error: 'Error updating reservation' });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    console.log(`Received request to delete reservation with ID: ${req.params.id}`);
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        console.log('Result from delete operation:', reservation);
        if (!reservation) {
            console.log(`No reservation found with ID: ${req.params.id}`);
            return res.status(404).json({ message: `Reservation not found ${req.params.id}` });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        console.error('Error deleting reservation', err);
        res.status(500).json({ error: 'Error deleting reservation' });
    }
});


// Create a new reservation
router.post('/', async (req, res) => {
    const { restaurantId, date, numOfPeople, userId } = req.body;
    try {
        const reservation = new Reservation({ restaurantId, date, numOfPeople, userId });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ error: 'Error making reservation' });
    }
});

module.exports = router;
