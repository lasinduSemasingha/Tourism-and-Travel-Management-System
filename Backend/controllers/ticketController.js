const Ticket = require('../models/Ticket');

exports.getTickets = async (req, res) => {
  try {
    const { departure, arrival, travelDate } = req.query;
    if (!departure || !arrival || !travelDate) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }
    const tickets = await Ticket.find({
      departure,
      arrival,
      travelDate: new Date(travelDate).toISOString().slice(0, 10) // Ensure date format
    });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTicket = async (req, res) => {
  const { departure, arrival, travelDate, availableSeats, price } = req.body;
  try {
    const newTicket = new Ticket({ departure, arrival, travelDate, availableSeats, price });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
