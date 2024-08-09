const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');

exports.createBooking = async (req, res) => {
  const { userId, ticketId, numOfPassengers, totalAmount } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    if (ticket.availableSeats < numOfPassengers) return res.status(400).json({ error: 'Not enough seats available' });
    
    ticket.availableSeats -= numOfPassengers;
    await ticket.save();
    
    const newBooking = new Booking({ userId, ticketId, numOfPassengers, totalAmount });
    await newBooking.save();
    
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('ticketId');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
