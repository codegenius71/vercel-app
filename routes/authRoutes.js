const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

// Sign-Up Route
router.post('/signup', async (req, res) => {
    const { firstName, lastName, username, email, phoneNumber, password } = req.body;

    // Check if any of the required fields are missing
    if (!email || !username || !phoneNumber || !password) {
        return res.status(400).json({ success: false, message: 'Email, Phone, and Password are required' });
    }
    
    try {
        // Check for existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phoneNumber }, { username }]
        });

        if (existingUser) {
            let message = 'An account already exists with the same ';
            if (existingUser.email === email) message += 'email.';
            if (existingUser.phoneNumber === phoneNumber) message += ' phone number.';
            if (existingUser.username === username) message += ' username.';
            return res.status(400).json({ success: false, message });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); // Ensure this is before using the hashed password

        // Create new user with hashed password
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password: hashedPassword // Use hashed password
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
    }
});


router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Sign-in successful',
            token: token,
            firstName: user.firstName, // Add firstName
            username: user.username,   // Add username
        });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
    }
});



module.exports = router;
