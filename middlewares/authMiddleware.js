// authMiddleware.js
const jwt = require('jsonwebtoken');
const { generateJwtSecret } = require('../config/config'); // Import generateJwtSecret function

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // Generate JWT secret dynamically based on the account ID (example: accountId)
    const accountId = req.accountId; // Assuming accountId is available in the request
    const jwtSecret = generateJwtSecret(accountId);
    
    const decodedToken = jwt.verify(token, jwtSecret); // Use dynamic JWT secret
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Other middleware and exports

module.exports = authMiddleware;
