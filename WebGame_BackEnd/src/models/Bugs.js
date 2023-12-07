const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    screenshot: {
        type: String,
    },
    status: {
        type: String,
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
})

const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;