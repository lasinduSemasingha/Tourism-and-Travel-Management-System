const express = require('express');
const router = express.Router();
const itemReservationController = require('../../controllers/travel_item/travelItemReservationController');

// Get all item reservations with item details
router.get('/', itemReservationController.getItemReservations);

// Add a new item reservation
router.post('/add', itemReservationController.addItemReservation);

// Update an item reservation
router.put('/update/:id', itemReservationController.updateItemReservation);

// Delete an item reservation
router.delete('/:id', itemReservationController.deleteItemReservation);

// Get item reservations for a specific user
router.get('/user/:userId', itemReservationController.getItemReservationsByUser);

module.exports = router;
