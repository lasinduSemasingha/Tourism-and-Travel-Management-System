const mongoose = require('mongoose');

const vehicleReservationSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'pending'
  }
});

module.exports = mongoose.model('VehicleReservation', vehicleReservationSchema);
