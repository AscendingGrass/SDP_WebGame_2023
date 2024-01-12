const mongoose = require('mongoose');

const NewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at:{
    type: Date,
    default: null,
},
deleted_at:{
    type: Date,
    default: null,
},
});

const New = mongoose.model('New', NewSchemaSchema);

module.exports = New;
