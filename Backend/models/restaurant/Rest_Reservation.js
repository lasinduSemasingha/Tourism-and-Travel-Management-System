const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant' // Reference to the Restaurant model
    },
    date: {
        type: Date,
        required: true
    },
    numOfPeople: {
        type: Number,
        required: true,
        min: 1 // Ensure that the number of people is at least 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    }
});

module.exports = mongoose.model('Rest_Reservation', reservationSchema);
