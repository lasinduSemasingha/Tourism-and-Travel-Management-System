const Booking = require('../../models/ticket_booking/Booking');
const User = require('../../models/user_managemnt/user'); // Import User model

// Create a new booking
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

// Get bookings by user ID
exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Log and validate userId
    console.log('Fetching bookings for user ID:', userId);
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Query for bookings matching the userId
    const bookings = await Booking.find({ userId }).populate('ticketId');

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this user' });
    }

    // Return the bookings
    res.status(200).json(bookings);
  } catch (err) {
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

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('ticketId'); // Fetch all bookings with ticket details
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { departure, arrival, travelDate, noOfPassengers, totalAmount } = req.body;

  try {
    // Validate required fields
    if (!departure || !arrival || !travelDate || !noOfPassengers || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { departure, arrival, travelDate, noOfPassengers, totalAmount },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ error: 'Error updating booking' });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting booking' });
  }
};

// Get all bookings for all users
exports.getAllBookingsForAllUsers = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('ticketId').populate('userId'); // Populate ticketId and userId
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching all bookings for all users:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

exports.countBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId: userId });
    const bookingCount = bookings.length;
    
    res.json({ bookingCount });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};
