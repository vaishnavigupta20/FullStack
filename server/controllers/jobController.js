const Job = require('../models/Job');
const asyncHandler = require('express-async-handler');

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer only)
const createJob = asyncHandler(async (req, res) => {
  const { title, description, category, longitude, latitude, whatsappNumber, salary } = req.body;

  // 1. Precise Validation
  if (!title || !longitude || !latitude || !whatsappNumber) {
    res.status(400);
    throw new Error('Please provide title, location (long/lat), and contact number');
  }

  // 2. Creation with Number Parsing
  const job = await Job.create({
    title,
    description,
    category,
    whatsappNumber,
    salary,
    employer: req.user._id, 
    location: {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)]
    }
  });

  res.status(201).json({ success: true, data: job });
});

// @desc    Get jobs near location
// @route   GET /api/jobs/nearby
// @access  Public (Workers looking for work)
const getNearbyJobs = asyncHandler(async (req, res) => {
  const { lng, lat, dist } = req.query;

  // 1. Validation for Query Params
  if (!lng || !lat) {
    res.status(400);
    throw new Error('Please provide lng and lat in query parameters (e.g. ?lng=77.1&lat=28.7)');
  }

  // 2. Geospatial Query
  // Note: MongoDB requires [longitude, latitude] order
  const jobs = await Job.find({
    location: {
      $near: {
        $geometry: { 
          type: "Point", 
          coordinates: [parseFloat(lng), parseFloat(lat)] 
        },
        $maxDistance: parseInt(dist) || 5000 // Default to 5km radius
      }
    },
    status: 'open'
  }).populate('employer', 'name rating'); 

  res.status(200).json({ 
    success: true, 
    count: jobs.length, 
    data: jobs 
  });
});

module.exports = {
  createJob,
  getNearbyJobs
};