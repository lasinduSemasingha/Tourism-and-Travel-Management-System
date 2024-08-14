const mongoose = require('mongoose');
const Hotel = require('../../models/hotel_management/hotel');
const path = require('path');
const fs = require('fs');

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
};

// Add a new hotel with image upload
exports.addHotel = async (req, res) => {
  const { name, owner, address, country, city, price, contactNumber, email, roomType } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const hotel = new Hotel({
      name,
      owner,
      address,
      country,
      city,
      price,
      contactNumber,
      email,
      roomType, // Include roomType here
      approvalStatus: 'pending',
      image: imagePath ? { data: fs.readFileSync(imagePath), contentType: req.file.mimetype } : null,
    });

    const createdHotel = await hotel.save();
    res.status(201).json(createdHotel);

    // Optionally, delete the file after saving to database if needed
    if (imagePath) fs.unlinkSync(imagePath);

  } catch (error) {
    res.status(500).json({ message: 'Error adding hotel', error: error.message });
  }
};

// Update hotel details, including image
exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, owner, address, country, city, price, contactNumber, email, approvalStatus, roomType } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    hotel.name = name || hotel.name;
    hotel.owner = owner || hotel.owner;
    hotel.address = address || hotel.address;
    hotel.country = country || hotel.country;
    hotel.city = city || hotel.city;
    hotel.price = price || hotel.price; // Update price
    hotel.contactNumber = contactNumber || hotel.contactNumber;
    hotel.email = email || hotel.email;
    hotel.approvalStatus = approvalStatus || hotel.approvalStatus;
    hotel.roomType = roomType || hotel.roomType; // Update roomType
    if (imagePath) {
      hotel.image = { data: fs.readFileSync(imagePath), contentType: req.file.mimetype };
    }

    const updatedHotel = await hotel.save();

    // Optionally, delete the file after saving to database if needed
    if (imagePath) fs.unlinkSync(imagePath);

    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel', error: error.message });
  }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Hotel.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Hotel removed' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error: error.message });
  }
};

// Get image for a specific hotel
exports.getHotelImage = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel || !hotel.image) {
      return res.status(404).json({ message: 'Hotel or image not found' });
    }

    const base64Image = hotel.image.data.toString('base64');
    const imgSrc = `data:${hotel.image.contentType};base64,${base64Image}`;
    res.json({ imgSrc });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel image', error: error.message });
  }
};

// Get a hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update hotel status only
exports.updateHotelStatus = async (req, res) => {
  const { id } = req.params;
  const { approvalStatus } = req.body; // Only expect the status in the request body

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Update only the status
    hotel.approvalStatus = approvalStatus || hotel.approvalStatus;

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel status', error: error.message });
  }
};
