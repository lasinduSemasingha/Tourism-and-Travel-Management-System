const express = require('express');
const {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicleImage,
} = require('../../controllers/vehicle_reservation/vehicleController');
const upload = require('../../middlewares/upload'); // Adjust the path as needed

const router = express.Router();

// Fetch all vehicles
router.get('/', getVehicles);

// Add a new vehicle with image upload
router.post('/register', upload.single('image'), addVehicle);

// Update vehicle details, including image
router.put('/update/:id', upload.single('image'), updateVehicle);

// Get a vehicle by ID
router.get('/:id', getVehicleById);

// Delete a vehicle by ID
router.delete('/:id', deleteVehicle);

// Get a vehicle's image by ID
router.get('/image/:id', getVehicleImage);

module.exports = router;
