const express = require('express');
const router = express.Router();
const Activity = require('../../models/special_activity/Activity');

// Create a new activity
router.post('/', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update activity
router.put('/:id', async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) return res.status(404).json({ error: 'Activity not found' });
    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ error: 'Activity not found' });
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
