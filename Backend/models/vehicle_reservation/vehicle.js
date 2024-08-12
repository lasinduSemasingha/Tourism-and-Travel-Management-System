const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'truck','wheel'],
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  withDriver: {
    type: Boolean,
    default: false
  },
  rentalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  image: {  // Add this field
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
