const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['admin', 'author', 'reader'], required: true },
  authorRequestStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: ' ' }
});

module.exports = mongoose.model('User', userSchema);