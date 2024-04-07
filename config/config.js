const crypto = require('crypto');

// Function to generate JWT secret based on the account
const generateJwtSecret = (accountId) => {
  // Generate a random string for the secret
  const randomString = crypto.randomBytes(32).toString('hex');
  
  // Use a secure hashing algorithm to generate the secret
  const secret = crypto
    .createHmac('sha256', randomString)
    .update(accountId.toString())
    .digest('hex');
  
  return secret;
};

module.exports = {
  generateJwtSecret,
  // Other configuration variables
};
