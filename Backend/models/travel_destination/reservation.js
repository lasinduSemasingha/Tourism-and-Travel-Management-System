const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Destination',
  },
  reservedAt: {
    type: Date,
    default: Date.now,
  },
  ticketDetails: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
