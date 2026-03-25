const express = require('express');
const router = express.Router();
const { createJob, getNearbyJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createJob); // Only logged in users can post

router.get('/nearby', getNearbyJobs); // Public can search

module.exports = router;