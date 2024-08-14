const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  image: { 
    data: Buffer,
    contentType: String
  },
}, {
  timestamps: true,
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
