const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Job title is required'], 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['Electrician', 'Delivery', 'Driver', 'House Help', 'Construction', 'Cleaning', 'Other'], 
    required: true 
  },
  employer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  salary: { 
    type: String // Changed to String to allow "500/day" or "Negotiable"
  },
  whatsappNumber: { 
    type: String, 
    required: true 
  },
  // GeoJSON for proximity search
  location: {
    type: { 
      type: String, 
      enum: ['Point'], // Strictly must be 'Point'
      default: 'Point' 
    },
    coordinates: { 
      type: [Number], 
      required: true // [longitude, latitude]
    }
  },
  address: String,
  status: { 
    type: String, 
    enum: ['open', 'closed'], 
    default: 'open' 
  }
}, { timestamps: true });

// CRITICAL: This index allows the $near query in your controller to work.
// Without this, the 'getNearbyJobs' route will throw a 500 error.
jobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', jobSchema);