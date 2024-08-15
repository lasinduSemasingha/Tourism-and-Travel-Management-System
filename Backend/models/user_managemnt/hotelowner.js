const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hotelOwnerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  gender: { type: String, required: true },
  hotelName: { type: String, required: true },
  role: { type: String, default: 'hotelOwner' }
});

// Password hashing middleware
hotelOwnerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user-entered password with hashed password
hotelOwnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const HotelOwner = mongoose.model('HotelOwner', hotelOwnerSchema);

module.exports = HotelOwner;
