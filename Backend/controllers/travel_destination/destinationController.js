const Destination = require('../../models/travel_destination/destination');

// Get all destinations
exports.getDestinations = async (req, res) => {
  const destinations = await Destination.find();
  res.json(destinations);
};

// Add a new destination
exports.addDestination = async (req, res) => {
  const { name, location, price, description } = req.body;

  const destination = new Destination({
    name,
    location,
    price,
    description,
  });

  const createdDestination = await destination.save();
  res.status(201).json(createdDestination);
};

// Update a destination
exports.updateDestination = async (req, res) => {
  const { id } = req.params;
  const { name, location, price, description, availability } = req.body;

  const destination = await Destination.findById(id);

  if (destination) {
    destination.name = name || destination.name;
    destination.location = location || destination.location;
    destination.price = price || destination.price;
    destination.description = description || destination.description;
    destination.availability = availability !== undefined ? availability : destination.availability;

    const updatedDestination = await destination.save();
    res.json(updatedDestination);
  } else {
    res.status(404).json({ message: 'Destination not found' });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  const { id } = req.params;

  const destination = await Destination.findById(id);

  if (destination) {
    await destination.remove();
    res.json({ message: 'Destination removed' });
  } else {
    res.status(404).json({ message: 'Destination not found' });
  }
};
