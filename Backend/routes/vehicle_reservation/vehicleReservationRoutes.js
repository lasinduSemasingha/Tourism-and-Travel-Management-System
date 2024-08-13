const express = require('express');
const router = express.Router();
const vehicleReservationController = require('../../controllers/vehicle_reservation/vehicleReservationController');

// Routes for vehicle reservations
router.get('/', vehicleReservationController.getVehicleReservations);
router.post('/vehicleadd', vehicleReservationController.addVehicleReservation);
router.put('/update/:id', vehicleReservationController.updateVehicleReservation);
router.delete('/:id', vehicleReservationController.deleteVehicleReservation);
router.get('/:userId', vehicleReservationController.getVehicleReservationsByUser);

module.exports = router;
