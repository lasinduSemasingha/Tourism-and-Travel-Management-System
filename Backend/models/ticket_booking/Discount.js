const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountCodeSchema = new Schema({
    code: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true }
  });
  
module.exports = mongoose.model('DiscountCode', discountCodeSchema);
