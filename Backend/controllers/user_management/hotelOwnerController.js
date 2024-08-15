const HotelOwner = require('../../models/user_managemnt/hotelowner'); // Adjust the path as necessary


// Register a new hotel owner
exports.registerHotelOwner = async (req, res) => {
  const { name, email, password, contactNumber, address, country, gender, hotelName } = req.body;

  if (!name || !email || !password || !contactNumber || !address || !country || !gender || !hotelName) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const hotelOwnerExists = await HotelOwner.findOne({ email });

  if (hotelOwnerExists) {
    return res.status(400).json({ message: 'Hotel owner already exists' });
  }

  const hotelOwner = await HotelOwner.create({
    name,
    email,
    password,
    contactNumber,
    address,
    country,
    gender,
    hotelName,
  });

  if (hotelOwner) {

    res.status(201).json({
      _id: hotelOwner._id,
      name: hotelOwner.name,
      email: hotelOwner.email,
      contactNumber: hotelOwner.contactNumber,
      address: hotelOwner.address,
      country: hotelOwner.country,
      gender: hotelOwner.gender,
      hotelName: hotelOwner.hotelName,
      role: hotelOwner.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid hotel owner data' });
  }
};

// Authenticate hotel owner & get token
exports.authHotelOwner = async (req, res) => {
  const { email, password } = req.body;

  const hotelOwner = await HotelOwner.findOne({ email });

  if (hotelOwner && (await hotelOwner.matchPassword(password))) {
    res.json({
      _id: hotelOwner._id,
      name: hotelOwner.name,
      email: hotelOwner.email,
      contactNumber: hotelOwner.contactNumber,
      address: hotelOwner.address,
      country: hotelOwner.country,
      gender: hotelOwner.gender,
      hotelName: hotelOwner.hotelName,
      role: hotelOwner.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get hotel owner profile by ID
exports.getHotelOwnerProfile = async (req, res) => {
  const { id } = req.params;

  const hotelOwner = await HotelOwner.findById(id);

  if (hotelOwner) {
    res.json({
      _id: hotelOwner._id,
      name: hotelOwner.name,
      email: hotelOwner.email,
      contactNumber: hotelOwner.contactNumber,
      address: hotelOwner.address,
      country: hotelOwner.country,
      gender: hotelOwner.gender,
      hotelName: hotelOwner.hotelName,
      role: hotelOwner.role,
    });
  } else {
    res.status(404).json({ message: 'Hotel owner not found' });
  }
};

// Update hotel owner profile by ID
exports.updateHotelOwnerProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, contactNumber, address, country, gender, hotelName } = req.body;

  const hotelOwner = await HotelOwner.findById(id);

  if (hotelOwner) {
    hotelOwner.name = name || hotelOwner.name;
    hotelOwner.email = email || hotelOwner.email;
    hotelOwner.contactNumber = contactNumber || hotelOwner.contactNumber;
    hotelOwner.address = address || hotelOwner.address;
    hotelOwner.country = country || hotelOwner.country;
    hotelOwner.gender = gender || hotelOwner.gender;
    hotelOwner.hotelName = hotelName || hotelOwner.hotelName;
    if (password) {
      hotelOwner.password = password;
    }

    const updatedHotelOwner = await hotelOwner.save();

    res.json({
      _id: updatedHotelOwner._id,
      name: updatedHotelOwner.name,
      email: updatedHotelOwner.email,
      contactNumber: updatedHotelOwner.contactNumber,
      address: updatedHotelOwner.address,
      country: updatedHotelOwner.country,
      gender: updatedHotelOwner.gender,
      hotelName: updatedHotelOwner.hotelName,
      role: updatedHotelOwner.role,
    });
  } else {
    res.status(404).json({ message: 'Hotel owner not found' });
  }
};
