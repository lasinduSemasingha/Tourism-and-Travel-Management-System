const express = require('express');
const {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination,
} = require('../../controllers/travel_destination/destinationController');
const router = express.Router();

router.route('/add')
  .post(addDestination);

router.route('/:id')
  .put(updateDestination)
  .get(getDestinations);

  //fetch all the destinations
router.get('/', getDestinations);
router.delete('/:id', deleteDestination);

module.exports = router;

