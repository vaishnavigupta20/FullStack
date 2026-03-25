const express = require('express');
const router = express.Router();
const { 
  getUserProfile, // Added this import
  updateUserProfile,
  getUserById     // Added this import
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// --- Profile Routes ---

// Handle both GET (view) and PUT (update) on the same path
router.route('/profile')
  .get(protect, getUserProfile)      // This fixes the "Cannot GET" error
  .put(protect, uploadSingle, updateUserProfile);

// --- Public User Routes ---

// Handle fetching specific user by ID (e.g., viewing an employer's details)
router.route('/:id').get(getUserById);

module.exports = router;