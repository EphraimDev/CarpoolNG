const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token does not exist
    if(!token) {
        return res.status(400).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secret);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}