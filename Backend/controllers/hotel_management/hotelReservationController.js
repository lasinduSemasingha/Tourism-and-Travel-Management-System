const HotelReservation = require('../../models/hotel_management/hotelReservation');
const Hotel = require('../../models/hotel_management/hotel');
const User = require('../../models/user_managemnt/user'); // Assuming you have a User model
const sendConfirmationEmail = require('../../utils/emailservice'); // Adjust the path as necessary

// Get all hotel reservations with hotel details
exports.getHotelReservations = async (req, res) => {
  try {
    const hotelReservations = await HotelReservation.find()
      .populate('hotelId', 'name address country city price roomType')
      .populate('userId', 'name email'); // Assuming you have a name field in User model
    res.json(hotelReservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel reservations', error: error.message });
  }
};

// Add a new hotel reservation with hotel and user details
exports.addHotelReservation = async (req, res) => {
  const { hotelId, userId, checkInDate, checkOutDate } = req.body;

  try {
    // Check if hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hotelReservation = new HotelReservation({
      hotelId,
      userId,
      checkInDate,
      checkOutDate,
    });

    const createdHotelReservation = await hotelReservation.save();
    // Fetch reservation with hotel and user details
    const populatedHotelReservation = await HotelReservation.findById(createdHotelReservation._id)
      .populate('hotelId', 'name address country city price roomType')
      .populate('userId', 'name email');
    res.status(201).json(populatedHotelReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error adding hotel reservation', error: error.message });
  }
};

// Update a hotel reservation
exports.updateHotelReservation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the reservation by ID
    const hotelReservation = await HotelReservation.findById(id)
      .populate('hotelId', 'name address country city price roomType')
      .populate('userId', 'name email');

    if (hotelReservation) {
      // Update the status if provided
      if (status) {
        hotelReservation.status = status;
      }

      // Save the updated reservation
      const updatedHotelReservation = await hotelReservation.save();

      // Send email if status is confirmed or cancelled
      if (status === 'confirmed' || status === 'cancelled') {
        const customerEmail = hotelReservation.userId.email;
        const reservationDetails = {
          userName: hotelReservation.userId.name,
          destinationName: hotelReservation.hotelId.name,
          fromDate: hotelReservation.checkInDate,
          toDate: hotelReservation.checkOutDate
        };
        sendConfirmationEmail(customerEmail, reservationDetails, status);
      }

      res.json(updatedHotelReservation);
    } else {
      res.status(404).json({ message: 'Hotel reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel reservation', error: error.message });
  }
};

// Delete a hotel reservation
exports.deleteHotelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await HotelReservation.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Hotel reservation removed' });
    } else {
      res.status(404).json({ message: 'Hotel reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel reservation', error: error.message });
  }
};

// Get hotel reservations by user
exports.getHotelReservationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find reservations by userId and populate hotel and user details
    const hotelReservations = await HotelReservation.find({ userId })
      .populate('hotelId', 'name address country city price roomType')
      .populate('userId', 'name email');

    // If no reservations are found
    if (hotelReservations.length === 0) {
      return res.status(404).json({ message: 'No hotel reservations found for this user' });
    }

    // Respond with the reservations data
    res.json(hotelReservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel reservations', error: error.message });
  }
};
