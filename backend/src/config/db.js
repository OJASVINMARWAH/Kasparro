const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use Google's Public DNS to bypass local ISP/Hotspot SRV blocking
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Don't exit process if local dev, but log it clearly
    // process.exit(1); 
  }
};

module.exports = connectDB;
