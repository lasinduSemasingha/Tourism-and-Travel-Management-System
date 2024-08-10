const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route to get all tickets with optional filters
router.get('/', ticketController.getTickets);

// Route to create a new ticket
router.post('/', ticketController.createTicket);

// Route to get a ticket by ID
router.get('/:id', ticketController.getTicketById);

module.exports = router;
