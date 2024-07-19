const mongoose = require('mongoose');
const db=require('./Connection');//importing the database connection

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answer: { type: String, required: true },
    approved: { type: Boolean, default: false },
    status: {type: String, enum:[ "Deactivate", "Resolved" ] }
});

module.exports = mongoose.model('Answer', answerSchema);
