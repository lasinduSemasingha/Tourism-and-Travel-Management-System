const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant/Restaurant');

// Add a new restaurant
router.post('/', async (req, res) => {
    const { name, address, phone, area, cuisine, priceRange, description, menu } = req.body;
    try {
        const restaurant = new Restaurant({ name, address, phone, area, cuisine, priceRange, description, menu });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'Error adding restaurant' });
    }
});

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
});

// Get a restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
        res.status(200).json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching restaurant' });
    }
});

// Update a restaurant
router.put('/:id', async (req, res) => {
    const { name, address, phone, area, cuisine, priceRange, description, menu } = req.body;
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { name, address, phone, area, cuisine, priceRange, description, menu }, { new: true });
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
        res.status(200).json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'Error updating restaurant' });
    }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Restaurant deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting restaurant' });
    }
});

router.get('/search', async (req, res) => {
    const { area, cuisine } = req.query;
    try {
        const restaurants = await Restaurant.find({ area, cuisine });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
});

router.get('/:id/menu', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant.menu);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching menu' });
    }
});

module.exports = router;
