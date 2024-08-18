const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Updated ref to 'User'
  noOfPassengers: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
