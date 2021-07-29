const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema({
  _id: String,
  websites: [{ type: String }],
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Whitelist', whitelistSchema);
