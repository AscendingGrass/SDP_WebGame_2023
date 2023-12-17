const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: null,
    },
    deleted_at:{
        type: Date,
        default: null,
    },
})

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;