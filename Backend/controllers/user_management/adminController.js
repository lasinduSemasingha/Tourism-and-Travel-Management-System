const Admin = require('../../models/user_managemnt/admin'); // Adjust the path as necessary

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};

// Authenticate admin & get token
exports.authAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get admin profile by ID
exports.getAdminProfile = async (req, res) => {
    const { id } = req.params;
  
    const admin = await Admin.findById(id);
  
    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  };
  
// Update admin profile by ID
exports.updateAdminProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    const admin = await Admin.findById(id);
  
    if (admin) {
      admin.name = name || admin.name;
      admin.email = email || admin.email;
      if (password) {
        admin.password = password;
      }
  
      const updatedAdmin = await admin.save();
  
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  };