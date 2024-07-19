const mongoose = require('mongoose');
const db=require('./Connection');//importing the database connection
const bcrypt = require('bcryptjs');


const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true }
});

// Hash password before saving user to the database
adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
    }
    next();
});

module.exports = mongoose.model('Admin', adminSchema);
