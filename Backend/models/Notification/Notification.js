// models/notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: {type: String, required: true },
    foodName: { type: String, required: true },
    description: String,
    ingredients: [String],
    ratings: { type: Number, min: 0, max: 5 }, // Ratings between 0 and 5
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }, // Add this field
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
