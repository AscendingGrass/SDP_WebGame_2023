const mongoose = require("mongoose");

const SaveSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "User"
    },
    state: {

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

const Save = mongoose.model("Save", SaveSchema);

module.exports = Save;