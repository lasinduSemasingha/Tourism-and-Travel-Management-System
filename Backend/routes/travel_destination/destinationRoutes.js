const express = require('express');
const {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination,
} = require('../../controllers/travel_destination/destinationController');
const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(addDestination);

router.route('/:id')
  .put(updateDestination)
  .delete(deleteDestination);

module.exports = router;
