const express = require('express');
const { 
  registerHotelOwner, 
  authHotelOwner, 
  getHotelOwnerProfile, 
  updateHotelOwnerProfile 
} = require('../../controllers/user_management/hotelOwnerController');

const router = express.Router();

// Register new hotel owner
router.post('/create', registerHotelOwner);

// Hotel owner login
router.post('/login', authHotelOwner);

// Get hotel owner profile by ID
router.get('/:id', getHotelOwnerProfile);

// Update hotel owner profile by ID
router.put('/:id', updateHotelOwnerProfile);

module.exports = router;
