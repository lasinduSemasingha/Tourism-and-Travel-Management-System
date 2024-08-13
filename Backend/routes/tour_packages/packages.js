const express = require('express');
const router = express.Router();
const Package = require('../../models/tour_packages/Package');
//const Feedback = require('../../models/tour_packages/Feedback');
const Discount = require('../../models/tour_packages/Discount');

// Get all packages with optional filters
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const packages = await Package.find(filters);
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get package by ID
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ error: 'Package not found' });
    res.status(200).json(package);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new package
router.post('/', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing package
router.put('/:id', async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPackage) return res.status(404).json({ error: 'Package not found' });
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ error: 'Package not found' });
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit feedback for a package
router.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply a discount to a package
router.post('/discount', async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
