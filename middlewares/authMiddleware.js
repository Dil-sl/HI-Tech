// authMiddleware.js
const jwt = require('jsonwebtoken');
const { generateJwtSecret } = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Assuming accountId is available in the request or user object
    const accountId = req.accountId || req.user?.accountId;

    if (!accountId) {
      console.log(token);
      console.log('Account ID not found in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const jwtSecret = generateJwtSecret(accountId);

    console.log('Received token:', token);

    const decodedToken = jwt.verify(token, jwtSecret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
