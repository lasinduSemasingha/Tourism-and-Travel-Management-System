const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getTickets);  // Handle GET requests to /api/tickets
router.post('/', ticketController.createTicket);

module.exports = router;
