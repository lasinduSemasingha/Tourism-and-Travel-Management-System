const Booking = require('../../models/ticket_booking/Booking');
const User = require('../../models/user_managemnt/user'); // Import User model

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { ticketId, userId, noOfPassengers, bookingDate, totalAmount } = req.body;
    if (!ticketId || !noOfPassengers || !bookingDate || !totalAmount || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = new Booking({ ticketId, userId, noOfPassengers, bookingDate, totalAmount });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get booking by ID
exports.getBookingsByUserId = async (req, res) => {
  try {
    // Log the user ID from the request parameters
    console.log('Fetching bookings for user ID:', req.params.userId);

    // Check if userId exists in request parameters
    if (!req.params.userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find all bookings associated with the userId
    const bookings = await Booking.find({ userId: req.params.userId }).populate('ticketId');

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this user' });
    }

    // Return the found bookings
    res.status(200).json(bookings);
  } catch (err) {
    // Log and return the error
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: err.message });
  }
};



// Get all bookings for the logged-in user
exports.getBookings = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to set req.user
    const bookings = await Booking.find({ userId }).populate('ticketId');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};