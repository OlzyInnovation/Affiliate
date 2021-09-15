const mongoose = require('mongoose');

const twitterSchema = new mongoose.Schema({
  twitterConfig: [
    {
      _id: String,
      consumer_key: String,
      consumer_secret: String,
      access_token: String,
      access_token_secret: String,

      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('Twitter', twitterSchema);
