const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    volume: {
        type: Number,
    },
    save: {
        type: String,
    },
    scoreboard: {
        type: String,
    },
    status: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
