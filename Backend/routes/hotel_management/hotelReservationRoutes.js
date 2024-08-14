const express = require('express');
const router = express.Router();
const hotelReservationController = require('../../controllers/hotel_management/hotelReservationController');

// Get all hotel reservations with hotel details
router.get('/', hotelReservationController.getHotelReservations);

// Add a new hotel reservation
router.post('/add', hotelReservationController.addHotelReservation);

// Update a hotel reservation
router.put('/update/:id', hotelReservationController.updateHotelReservation);

// Delete a hotel reservation
router.delete('/:id', hotelReservationController.deleteHotelReservation);

// Get hotel reservations for a specific user
router.get('/user/:userId', hotelReservationController.getHotelReservationsByUser);

module.exports = router;
