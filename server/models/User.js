const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// NOTE: Do NOT require './config/db' here. 
// Mongoose models use the global connection established in server.js.

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'], 
    minlength: 6,
    select: false // Ensures password isn't returned in GET queries
  },
  role: { 
    type: String, 
    enum: ['worker', 'employer', 'admin'], 
    default: 'worker' 
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is critical for local job contact']
  },
  avatar: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true });

// --- Mongoose Hooks ---

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);