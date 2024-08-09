const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

//booking creating backend route
router.post('/', bookingController.createBooking);
//booking getting route by bokking ID
router.get('/:id', bookingController.getBooking);

module.exports = router;
