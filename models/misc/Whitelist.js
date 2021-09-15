const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema({
  whitelistConfig: [
    {
      _id: String,
      websites: String,
      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('Whitelist', whitelistSchema);
