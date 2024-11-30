const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = authenticateUser;
