const mongoose = require('mongoose');

const facebookSchema = new mongoose.Schema({
  facebookConfig: [
    {
      _id: String,
      url: String,
      token: String,
      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('Facebook', facebookSchema);
