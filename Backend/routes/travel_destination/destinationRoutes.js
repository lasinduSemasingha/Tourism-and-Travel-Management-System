const express = require('express');
const {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination,
  getDestinationImage,
} = require('../../controllers/travel_destination/destinationController');
const upload = require('../../middlewares/upload');
const router = express.Router();

router.post('/add', upload.single('image'),addDestination);
router.put('/:id', upload.single('image'),updateDestination);
router.route('/:id')
  .get(getDestinations);

  //fetch all the destinations
router.get('/', getDestinations);
router.delete('/:id', deleteDestination);

router.route('/image/:id').get(getDestinationImage);

module.exports = router;

