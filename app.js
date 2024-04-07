const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./config/db'); // Import the connectDB function

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use('/api/users', userRoutes); // Use the router exported from userRoutes.js

// Connect to MongoDB
connectDB();

// API endpoint for checking server status (exclude authMiddleware)
app.get('/api/status', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// API endpoint for checking database connection (exclude authMiddleware)
app.get('/api/dbcheck', async (req, res) => {
  try {
    await connectDB(); // Attempt to connect to the database
    res.status(200).json({ message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection error' });
  }
});

// Apply authMiddleware globally for all routes except /api/status and /api/dbcheck
app.use((req, res, next) => {
  if (req.path === '/api/status' || req.path === '/api/dbcheck')//|| req.path ==='/api/users/login'|| req.path === '/api/users/signup') 
  {
    next();
  } else {
    authMiddleware(req, res, next);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
