const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stockAmount: {
    type: Number,
    required: true,
    default: 0, // Default stock amount is 0 if not provided
  },
  category: {
    type: String,
    required: true,
    enum: ['Bags', 'Tents', 'Travel Accessories', 'Packing Cubes', 'Accessories','Other'],
    // 'Other' category added to accommodate any items that don't fit the specified categories
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  status: {
    type: String,
    enum: ['in-stock', 'out-of-stock'],
    default: 'in-stock',
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
