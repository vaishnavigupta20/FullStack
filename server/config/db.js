const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if the URI exists before attempting to connect
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in your .env file!");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;