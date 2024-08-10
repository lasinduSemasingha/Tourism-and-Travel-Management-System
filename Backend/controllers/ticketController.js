const Ticket = require('../models/Ticket');

exports.getTickets = async (req, res) => {
  const { departure, arrival, date, passengers } = req.query;

  try {
    // Construct query object
    const query = {};

    if (departure) query.departure = departure;
    if (arrival) query.arrival = arrival;
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