const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./config/db'); // Import the connectDB function

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use('/api/users', userRoutes); // Use the router exported from userRoutes.js
app.use(authMiddleware); // Token-based authentication middleware

// Connect to MongoDB
connectDB();
app.get('/api/status', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
