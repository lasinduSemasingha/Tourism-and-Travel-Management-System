const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/travel_destination/reservationController');

// Get all reservations with destination details
router.get('/', reservationController.getReservations);

// Add a new reservation
router.post('/add', reservationController.addReservation);

// Update a reservation
router.put('/update/:id', reservationController.updateReservation);

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

// Get reservations for a specific user
router.get('/:userId', reservationController.getReservationsByUser);


module.exports = router;
