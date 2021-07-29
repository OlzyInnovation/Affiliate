const mongoose = require('mongoose');

const twitterSchema = new mongoose.Schema({
  _id: String,
  consumer_key: String,
  consumer_secret: String,
  access_token: String,
  access_token_secret: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Twitter', twitterSchema);
