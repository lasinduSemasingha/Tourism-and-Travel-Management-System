const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'truck', 'cab', 'van'],
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
  image: { 
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
