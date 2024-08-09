const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

//All tickets getting route
router.get('/', ticketController.getTickets);
//ticket creating route
router.post('/', ticketController.createTicket);

module.exports = router;
