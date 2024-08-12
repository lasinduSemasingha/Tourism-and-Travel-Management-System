const Vehicle = require('../../models/vehicle_reservation/vehicle');

// Create a new vehicle with image upload
exports.addVehicle = async (req, res) => {
  const { ownerId, vehicleType, registrationNumber, withDriver, rentalPrice, status } = req.body;
  const image = req.file ? req.file.path : null;  // Store the image path

  try {
    const vehicle = new Vehicle({
      ownerId,
      vehicleType,
      registrationNumber,
      withDriver,
      rentalPrice,
      status,
      image
    });

    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
};

// Update vehicle details, including image
exports.updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { vehicleType, registrationNumber, withDriver, rentalPrice, status } = req.body;
  const image = req.file ? req.file.path : null;  // Store the new image path

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Update fields if new values are provided
    vehicle.vehicleType = vehicleType || vehicle.vehicleType;
    vehicle.registrationNumber = registrationNumber || vehicle.registrationNumber;
    vehicle.withDriver = withDriver !== undefined ? withDriver : vehicle.withDriver;
    vehicle.rentalPrice = rentalPrice || vehicle.rentalPrice;
    vehicle.status = status || vehicle.status;

    // Update image if new one is provided
    if (image) vehicle.image = image;

    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

// Get vehicles by owner
exports.getVehiclesByOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const vehicles = await Vehicle.find({ ownerId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles by owner', error: error.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};