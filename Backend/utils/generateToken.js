const jwt = require('jsonwebtoken');

// Function to generate a JSON Web Token (JWT)
const generateTokenUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      
    },
    process.env.JWT_SECRET,  // Secret key for signing the token
    {
      expiresIn: '30d'  // Token expiration time
    }
  );
};



module.exports = generateTokenUser;
