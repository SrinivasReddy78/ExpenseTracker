const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'You are not logged in!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await userModel.findOne({ email: decoded.email }).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token, please log in again' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = { isLoggedIn };
