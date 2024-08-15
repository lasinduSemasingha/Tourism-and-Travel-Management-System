const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  roomType: {
    type: String,
    enum: ['Deluxe Room', 'Standard Room', 'Executive Room'],
    required: true,
  },
  image: { 
    data: Buffer,
    contentType: String
  }
 }, { timestamps: true });

  module.exports = mongoose.model('Hotel', hotelSchema);