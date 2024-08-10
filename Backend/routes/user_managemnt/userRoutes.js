const express = require('express');
const router = express.Router();
const User = require('../../models/user_managemnt/user');

// Route to get a user profile by ID
router.get('user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password'); // Exclude password field

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        country: user.country,
        gender: user.gender,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a user profile by ID
router.put('user/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address, country, gender } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.address = address || user.address;
      user.country = country || user.country;
      user.gender = gender || user.gender;
      if (password) {
        user.password = password; // This should ideally be hashed
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        country: updatedUser.country,
        gender: updatedUser.gender,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
