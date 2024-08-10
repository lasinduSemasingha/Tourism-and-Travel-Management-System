const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  noOfPassengers: { type: Number, required: true }, // Changed from ObjectId to Number
  bookingDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
