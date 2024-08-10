const express = require('express');
const {
  getReservations,
  addReservation,
  updateReservation,
  deleteReservation,
} = require('../../controllers/travel_destination/reservationController');
const router = express.Router();

router.route('/')
  .get(getReservations)
  .post(addReservation);

router.route('/:id')
  .put(updateReservation)
  .delete(deleteReservation);

module.exports = router;
