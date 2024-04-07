const crypto = require('crypto');

// Function to generate JWT secret based on the account
const generateJwtSecret = (accountId) => {
  // Use a secure hashing algorithm to generate the secret
  const secret = crypto
    .createHmac('sha256', 'your_secret_key_here')
    .update(accountId.toString())
    .digest('hex');
  
  return secret;
};

module.exports = {
  generateJwtSecret,
  // Other configuration variables
};
