const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },  // Ensure uniqueness
    email: { type: String, required: true, unique: true },      // Ensure uniqueness
    phoneNumber: { type: String, required: true, unique: true }, // Ensure uniqueness
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
