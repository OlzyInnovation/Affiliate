const mongoose = require('mongoose');

const textReplacerSchema = new mongoose.Schema({
  replacement: [
    {
      _id: String,
      text: String,
      restore: String,
      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('TextReplacer', textReplacerSchema);
