/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

/*
 * Name: Hotel Room Booking System ~ Backed
 * Description: Build an Hotel Room Booking System using node.js, express.js application from the scratch
 * Author: Md. Samiur Rahman (Mukul)
 * Last Modified: 26/02/2023
 * Version: v0.0.1
 *
 */

// imports modules & dependencies
const mongoose = require('mongoose');
const app = require('./src/app');
const logger = require('./src/middleware/winston.logger');

// Update MongoDB connection with retry logic
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true
}).then(() => {
  console.log('Database connected successfully!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Handle MongoDB disconnection
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// app listens to .env defined port
if (process.env.VERCEL) {
  // Running on Vercel, export your app
  module.exports = app;
} else {
  // Running locally
  app.listen(process.env.PORT || 5000, () => {
    logger.info(`App server running on: ${process.env.APP_BASE_URL}`);
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}
