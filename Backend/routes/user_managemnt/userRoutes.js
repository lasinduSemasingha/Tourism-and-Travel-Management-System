const express = require('express');
const router = express.Router();
const User = require('../../models/user_managemnt/user');
const multer = require('multer');
const path = require('path');
const userController = require('../../controllers/user_management/userController')

// Configure multer for file uploads (for other files if needed)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route to get a user profile by ID
router.get('/:id', async (req, res) => {
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
        profilePicture: user.profilePicture // Include base64 profile picture
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a user profile by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address, country, gender, profilePicture } = req.body;

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
      if (profilePicture) {
        user.profilePicture = profilePicture;
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
        profilePicture: updatedUser.profilePicture // Include base64 profile picture
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/upload', async (req, res) => {
  try {
    const { profilePicture } = req.body;

    if (!profilePicture) {
      return res.status(400).json({ message: 'No image data provided' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { profilePicture }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ profilePicture: user.profilePicture });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
});

// Get all users
router.get('/', userController.getAllUsers);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);


module.exports = router;