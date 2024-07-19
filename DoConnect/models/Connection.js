const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb://127.0.0.1:27017/doconnect';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB database');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
const db = mongoose.connection;
module.exports = db;