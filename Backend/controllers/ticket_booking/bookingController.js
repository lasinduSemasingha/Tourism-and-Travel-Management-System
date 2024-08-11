const Booking = require('../../models/ticket_booking/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { ticketId, noOfPassengers, bookingDate, totalAmount } = req.body;
    console.log('Request Body:', req.body); // Log the request body

    if (!ticketId || !noOfPassengers || !bookingDate || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = new Booking({ ticketId, noOfPassengers, bookingDate, totalAmount });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Error creating booking:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    console.log('Fetching booking with ID:', req.params.id); // Log the ID
    const booking = await Booking.findById(req.params.id).populate('ticketId');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

