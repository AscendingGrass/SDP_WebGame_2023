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
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    scoreboard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scoreboard',
        default: null,
    },
    status: {
        type: String,
        default: "active"
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
