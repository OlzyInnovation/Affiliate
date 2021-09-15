const mongoose = require('mongoose');

const wordpressSchema = new mongoose.Schema({
  wordpressConfig: [
    {
      _id: String,
      url: String,
      username: String,
      password: String,
      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('Wordpress', wordpressSchema);
