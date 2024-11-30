const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Assuming you have a Mongoose User model

exports.signup = async (req, res) => {
    console.log('Received body:', req.body); // Log the request body to check if it's being received
    try {
        const { firstName, lastName, username, email, phoneNumber, password } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !username || !email || !phoneNumber || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Check for duplicate username, email, or phoneNumber
        const existingUser = await User.findOne({
            $or: [{ username }, { email }, { phoneNumber }],
        });

        if (existingUser) {
            let message = 'An account already exists with the same ';
            if (existingUser.username === username) message += 'username.';
            else if (existingUser.email === email) message += 'email.';
            else if (existingUser.phoneNumber === phoneNumber) message += 'phone number.';
            return res.status(400).json({ success: false, message });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
    }
};
