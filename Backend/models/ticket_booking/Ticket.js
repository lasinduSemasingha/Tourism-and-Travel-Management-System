const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  travelDate: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
  discountCode: { type: String },
  discountPercentage: { type: Number }
});


module.exports = mongoose.model('Ticket', ticketSchema);
