const VehicleReservation = require('../../models/vehicle_reservation/vehicleReservation');
const Vehicle = require('../../models/vehicle_reservation/vehicle');

// Get all vehicle reservations with vehicle details
exports.getVehicleReservations = async (req, res) => {
  try {
    const vehicleReservations = await VehicleReservation.find()
      .populate('vehicleId', 'vehicleType registrationNumber rentalPrice status');
    res.json(vehicleReservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle reservations', error: error.message });
  }
};

// Add a new vehicle reservation with vehicle details
exports.addVehicleReservation = async (req, res) => {
  const { vehicleId, userId } = req.body;

  try {
    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const vehicleReservation = new VehicleReservation({
      vehicleId,
      userId,
      status: 'available' // Default status
    });

    const createdVehicleReservation = await vehicleReservation.save();
    // Fetch reservation with vehicle details
    const populatedVehicleReservation = await VehicleReservation.findById(createdVehicleReservation._id)
      .populate('vehicleId', 'vehicleType registrationNumber rentalPrice status');
    res.status(201).json(populatedVehicleReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle reservation', error: error.message });
  }
};

// Update a vehicle reservation
exports.updateVehicleReservation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the reservation by ID
    const vehicleReservation = await VehicleReservation.findById(id)
      .populate('vehicleId', 'vehicleType registrationNumber rentalPrice status');

    if (vehicleReservation) {
      // Update the status if provided
      if (status) {
        vehicleReservation.status = status;
      }

      // Save the updated reservation
      const updatedVehicleReservation = await vehicleReservation.save();
      res.json(updatedVehicleReservation);
    } else {
      res.status(404).json({ message: 'Vehicle reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle reservation', error: error.message });
  }
};

// Delete a vehicle reservation
exports.deleteVehicleReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await VehicleReservation.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Vehicle reservation removed' });
    } else {
      res.status(404).json({ message: 'Vehicle reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle reservation', error: error.message });
  }
};

// Get vehicle reservations by user
exports.getVehicleReservationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find reservations by userId and populate vehicle details
    const vehicleReservations = await VehicleReservation.find({ userId })
      .populate('vehicleId', 'vehicleType registrationNumber rentalPrice status');

    // If no reservations are found
    if (vehicleReservations.length === 0) {
      return res.status(404).json({ message: 'No vehicle reservations found for this user' });
    }

    // Respond with the reservations data
    res.json(vehicleReservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle reservations', error: error.message });
  }
};
