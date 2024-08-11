const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  userId: { // Changed from user to userId
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
