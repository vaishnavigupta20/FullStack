const express = require('express');
const router = express.Router();

// 1. Import Auth Logic
const { 
  registerUser, 
  loginUser 
} = require('../controllers/authController');

// 2. Import User Profile Logic (from the updated userController)
const { 
  getUserProfile 
} = require('../controllers/userController');

// 3. Import Security Middleware
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new worker or employer
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user data
 * @access  Private (Requires 'protect' middleware)
 */
router.get('/me', protect, getUserProfile);

module.exports = router;