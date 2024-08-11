const Ticket = require('../../models/ticket_booking/Ticket');

exports.getTickets = async (req, res) => {
  const { departure, arrival, date, passengers } = req.query;

  try {
    // Construct query object
    const query = {};

    if (departure) query.departure = new RegExp(departure, 'i');
    if (arrival) query.arrival = new RegExp(arrival, 'i');
    if (date) query.travelDate = date;
    if (passengers) query.passengers = { $gte: passengers };

    // Find tickets based on query object
    const tickets = await Ticket.find(query);

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

exports.getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find a ticket by ID
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
