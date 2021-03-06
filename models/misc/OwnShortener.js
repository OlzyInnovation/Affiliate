const mongoose = require('mongoose');

const ownShortenerSchema = new mongoose.Schema({
  _id: String,
  shortener: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('OwnShortener', ownShortenerSchema);
