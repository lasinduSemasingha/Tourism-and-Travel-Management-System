const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { ticketId, userId, bookingDate } = req.body;
    if (!ticketId || !userId || !bookingDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newBooking = new Booking({ ticketId, userId, bookingDate });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('ticketId').populate('userId');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
