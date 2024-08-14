const Vehicle = require('../../models/vehicle_reservation/vehicle');
const path = require('path');
const fs = require('fs');

// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

// Add a new vehicle with image upload
exports.addVehicle = async (req, res) => {
  const { vehicleType, registrationNumber, withDriver, rentalPrice, status } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const vehicle = new Vehicle({
      vehicleType,
      registrationNumber,
      withDriver,
      rentalPrice,
      status,
      image: imagePath ? { data: fs.readFileSync(imagePath), contentType: req.file.mimetype } : null
    });

    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);

    // Optionally, delete the file after saving to database if needed
    if (imagePath) fs.unlinkSync(imagePath);

  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
};

// Update vehicle details, including image
exports.updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { vehicleType, registrationNumber, withDriver, rentalPrice, status } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.vehicleType = vehicleType || vehicle.vehicleType;
    vehicle.registrationNumber = registrationNumber || vehicle.registrationNumber;
    vehicle.withDriver = withDriver !== undefined ? withDriver : vehicle.withDriver;
    vehicle.rentalPrice = rentalPrice || vehicle.rentalPrice;
    vehicle.status = status || vehicle.status;
    if (imagePath) {
      vehicle.image = { data: fs.readFileSync(imagePath), contentType: req.file.mimetype };
    }

    const updatedVehicle = await vehicle.save();

    // Optionally, delete the file after saving to database if needed
    if (imagePath) fs.unlinkSync(imagePath);

    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Vehicle.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Vehicle removed' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};

// Get image for a specific vehicle
exports.getVehicleImage = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle || !vehicle.image) {
      return res.status(404).json({ message: 'Vehicle or image not found' });
    }

    const base64Image = vehicle.image.data.toString('base64');
    const imgSrc = `data:${vehicle.image.contentType};base64,${base64Image}`;
    res.json({ imgSrc });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle image', error: error.message });
  }
};

// Get a vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
      res.json(vehicle);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
