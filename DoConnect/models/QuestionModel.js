const mongoose = require('mongoose');
const db = require('./Connection');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    status: { type: String, enum: ['Deactivated', 'Pending', 'Resolved'], default: 'Pending' } // Add status property with enum values Deactivated, Pending, and Resolved
});

module.exports = mongoose.model('Question', questionSchema);
