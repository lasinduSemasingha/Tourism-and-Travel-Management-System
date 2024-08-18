const Destination = require('../../models/travel_destination/destination');
const fs = require('fs');

// Get all destinations
exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error: error.message });
  }
};

// Add a new destination with image upload
exports.addDestination = async (req, res) => {
  const { name, location, price, description } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const destination = new Destination({
      name,
      location,
      price,
      description,
      image: imagePath ? { data: fs.readFileSync(imagePath), contentType: req.file.mimetype } : null
    });

    const createdDestination = await destination.save();
    res.status(201).json(createdDestination);

    // Optionally, delete the file after saving to database if needed
    if (imagePath) fs.unlinkSync(imagePath);

  } catch (error) {
    res.status(500).json({ message: 'Error adding destination', error: error.message });
  }
};

// Update a destination, including image
exports.updateDestination = async (req, res) => {
  const { id } = req.params;
  const { name, location, price, description, availability } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    destination.name = name || destination.name;
    destination.location = location || destination.location;
    destination.price = price || destination.price;
    destination.description = description || destination.description;
    destination.availability = availability !== undefined ? availability : destination.availability;
    if (imagePath) {
      destination.image = { data: fs.readFileSync(imagePath), contentType: req.file.mimetype };
    }

    const updatedDestination = await destination.save();

    // Optionally, delete the file after saving to database if needed
    if (imagePath) fs.unlinkSync(imagePath);

    res.json(updatedDestination);
  } catch (error) {
    res.status(500).json({ message: 'Error updating destination', error: error.message });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Destination.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Destination removed' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination', error: error.message });
  }
};

// Get image for a specific destination
exports.getDestinationImage = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findById(id);
    if (!destination || !destination.image) {
      return res.status(404).json({ message: 'Destination or image not found' });
    }

    const base64Image = destination.image.data.toString('base64');
    const imgSrc = `data:${destination.image.contentType};base64,${base64Image}`;
    res.json({ imgSrc });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination image', error: error.message });
  }
};
