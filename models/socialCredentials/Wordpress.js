const mongoose = require('mongoose');

const wordpressSchema = new mongoose.Schema({
  _id: String,
  url: String,
  username: String,
  password: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Wordpress', wordpressSchema);
