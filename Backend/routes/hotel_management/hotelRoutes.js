const express = require('express');
const {
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getHotelImage,
  updateHotelStatus,
} = require('../../controllers/hotel_management/hotelController');
const upload = require('../../middlewares/upload'); // Adjust the path as needed

const router = express.Router();

// Fetch all hotels
router.get('/', getHotels);

// Add a new hotel with image upload
router.post('/register', upload.single('image'), addHotel);

// Update hotel details, including image
router.put('/update/:id', upload.single('image'), updateHotel);

// Get a hotel by ID
router.get('/:id', getHotelById);

// Delete a hotel by ID
router.delete('/:id', deleteHotel);

// Get a hotel's image by ID
router.get('/image/:id', getHotelImage);

router.put('/updatestatus/:id', updateHotelStatus);

module.exports = router;
