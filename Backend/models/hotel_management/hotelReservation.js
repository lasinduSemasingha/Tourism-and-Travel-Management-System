const mongoose = require('mongoose');

const hotelReservationSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Reference to the Hotel model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('HotelReservation', hotelReservationSchema);
