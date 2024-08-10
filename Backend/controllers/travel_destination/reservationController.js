const Reservation = require('../../models/travel_destination/reservation');

// Get all reservations for a user
exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).populate('destination');
  res.json(reservations);
};

// Add a new reservation
exports.addReservation = async (req, res) => {
  const { destination, ticketDetails } = req.body;

  const reservation = new Reservation({
    user: req.user._id,
    destination,
    ticketDetails,
  });

  const createdReservation = await reservation.save();
  res.status(201).json(createdReservation);
};

// Update reservation status or ticket details
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { status, ticketDetails } = req.body;

  const reservation = await Reservation.findById(id);

  if (reservation) {
    reservation.status = status || reservation.status;
    reservation.ticketDetails = ticketDetails || reservation.ticketDetails;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);

  if (reservation) {
    await reservation.remove();
    res.json({ message: 'Reservation removed' });
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
};
