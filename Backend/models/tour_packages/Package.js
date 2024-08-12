const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  accommodations: { type: [String], required: true },
  tours: { type: [String], required: true },
  transfers: { type: [String], required: true },
  packageType: { type: String, enum: ['Day Tour', 'Round Tour', 'Custom'], required: true },
  specialDiscounts: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);
