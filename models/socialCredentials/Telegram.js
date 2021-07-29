const mongoose = require('mongoose');

const telegramSchema = new mongoose.Schema({
  _id: String,
  channel: [{ type: String }],
  token: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Telegram', telegramSchema);
