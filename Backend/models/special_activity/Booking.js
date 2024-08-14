const mongoose = require('mongoose');

const sportBookingSchema = new mongoose.Schema({
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityName: { type: String, required: true},
  activityLocation: { type: String, required: true},
  price: {type: Number, required: true},
  date: { type: Date, required: true }
});

module.exports = mongoose.model('SportBooking', sportBookingSchema);
