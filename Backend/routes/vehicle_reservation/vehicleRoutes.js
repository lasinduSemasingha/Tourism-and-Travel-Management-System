const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicle_reservation/vehicleController');
const upload = require('../../middlewares/upload');

// Register a new vehicle with image
router.post('/register', upload.single('image'), vehicleController.addVehicle);

// Update vehicle details, including image
router.put('/update/:id', upload.single('image'), vehicleController.updateVehicle);

// Get all vehicles
router.get('/', vehicleController.getAllVehicles);  // Changed from getVehicles to getAllVehicles

// Get vehicles by owner
router.get('/owner/:ownerId', vehicleController.getVehiclesByOwner);

// Delete a vehicle
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;