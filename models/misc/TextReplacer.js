const mongoose = require('mongoose');

const textReplacerSchema = new mongoose.Schema({
  _id: String,
  text: [{ type: String }],
  restore: [{ type: String }],
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('TextReplacer', textReplacerSchema);
