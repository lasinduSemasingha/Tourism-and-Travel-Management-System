const mongoose = require('mongoose');

const itemReservationSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Item model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensure quantity is at least 1
  },
  reservationDate: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set the reservation date to the current date
  },
}, { timestamps: true });

module.exports = mongoose.model('ItemReservation', itemReservationSchema);
