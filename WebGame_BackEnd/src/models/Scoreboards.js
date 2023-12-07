const mongoose = require('mongoose');

const ScoreboardSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    score: {
        type: Number,
        default: 0,
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
    },
    deleted_at:{
        type: Date,
    },
    // Other properties specific to your Scoreboard model
});

const Scoreboard = mongoose.model('Scoreboard', ScoreboardSchema);

module.exports = Scoreboard;