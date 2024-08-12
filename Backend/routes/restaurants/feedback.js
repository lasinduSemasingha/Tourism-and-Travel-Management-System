const express = require('express');
const router = express.Router();
const Feedback = require('../../models/restaurant/Rest_Feedback');

router.post('/', async (req, res) => {
    const { restaurantId, feedback } = req.body;
    try {
        const newFeedback = new Feedback({ restaurantId, feedback });
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(500).json({ error: 'Error submitting feedback' });
    }
});

module.exports = router;
