const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    restaurantId: mongoose.Schema.Types.ObjectId,
    feedback: String
});

module.exports = mongoose.model('Rest_Feedback', feedbackSchema);
