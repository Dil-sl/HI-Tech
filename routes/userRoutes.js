const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Validation middleware for user creation and update
const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

// User Signup (No auth token required)
router.post('/signup', validateUser, UserController.createUser);

// User Login (No auth token required)
router.post('/login', UserController.loginUser);

// Read all users (requires authentication)
router.get('/', authMiddleware, UserController.getAllUsers);

// Read user by ID or User Code (requires authentication)
router.get('/:idOrCode', authMiddleware, UserController.getUserById);

// Update user by ID or User Code (requires authentication)
router.put('/:idOrCode', authMiddleware, validateUser, UserController.updateUser);

// Delete user by ID or User Code (requires authentication)
router.delete('/:idOrCode', authMiddleware, UserController.deleteUser);

// Search Users (requires authentication)
router.post('/search', authMiddleware, UserController.searchUsers);

module.exports = router;
