const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

//feedback adding route
router.post('/', feedbackController.submitFeedback);
//feedbacks getting route
router.get('/', feedbackController.getFeedbacks);

module.exports = router;
