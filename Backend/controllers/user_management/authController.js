const User = require('../../models/user_managemnt/user');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, address, country, gender } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
    address,   // Added field
    country,   // Added field
    gender,    // Added field
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,  // Added field
      country: user.country,  // Added field
      gender: user.gender,    // Added field
      role: user.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Authenticate user & get token
exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,  // Added field
      country: user.country,  // Added field
      gender: user.gender,    // Added field
      role: user.role,

    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
