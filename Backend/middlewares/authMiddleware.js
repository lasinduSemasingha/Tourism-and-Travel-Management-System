// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user_managemnt/user'); // Adjust path as needed

const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        console.log('User:', req.user); // Debugging line
  
        if (!req.user) {
          return res.status(401).json({ message: 'User not found' });
        }
  
        next();
      } catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ message: 'Not authorized' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  

module.exports = { protect };
