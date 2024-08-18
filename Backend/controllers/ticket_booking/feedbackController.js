const Feedback = require('../../models/ticket_booking/Feedback');

exports.submitFeedback = async (req, res) => {
  const { userId, rating, comment } = req.body;
  try {
    const newFeedback = new Feedback({ userId, rating, comment });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ rating: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
