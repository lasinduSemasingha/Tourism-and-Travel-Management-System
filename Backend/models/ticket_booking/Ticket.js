const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for ticket data requirement
const ticketSchema = new Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  travelDate: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);
