const mongoose = require('mongoose');

const facebookSchema = new mongoose.Schema({
  _id: String,
  url: String,
  token: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Facebook', facebookSchema);
