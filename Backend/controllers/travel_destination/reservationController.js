const Reservation = require('../../models/travel_destination/reservation');
const Destination = require('../../models/travel_destination/destination');

// Get all reservations with destination details
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('destinationId', 'name location price description');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

// Add a new reservation with destination details
exports.addReservation = async (req, res) => {
  const { destinationId, fromDate, toDate, totalPrice, userId } = req.body;

  try {
    // Check if destination exists
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const reservation = new Reservation({
      destinationId,
      fromDate,
      toDate,
      userId,
      totalPrice,
      status: 'pending' // Default status
    });

    const createdReservation = await reservation.save();
    // Fetch reservation with destination details
    const populatedReservation = await Reservation.findById(createdReservation._id)
      .populate('destinationId', 'name location price description');
    res.status(201).json(populatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error adding reservation', error: error.message });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the reservation by ID
    const reservation = await Reservation.findById(id)
      .populate('destinationId', 'name location price description');

    if (reservation) {
      // Update the status if provided
      if (status) {
        reservation.status = status;
      }

      // Save the updated reservation
      const updatedReservation = await reservation.save();
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error: error.message });
  }
};


// Delete a reservation
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Reservation.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Reservation removed' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error: error.message });
  }
};

 
exports.getReservationsByUser = async (req, res) => {
  const { userId } = req.params;

  // Log the userId for debugging
  console.log('Fetching reservations for user ID:', userId);

  try {
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find reservations by userId and populate destination details
    const reservations = await Reservation.find({ user: userId })
      .populate('destinationId', 'name location price description'); // Adjust fields as needed

    // Log reservations for debugging
    console.log('Reservations found:', reservations);

    // If no reservations are found
    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    // Respond with the reservations data
    res.json(reservations);
  } catch (error) {
    // Log the error and send a response
    console.error('Error fetching reservations:', error.message);
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

