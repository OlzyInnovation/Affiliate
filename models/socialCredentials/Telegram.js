const mongoose = require('mongoose');

const telegramSchema = new mongoose.Schema({
  telegramChannels: [
    {
      _id: String,
      channel: String,
      token: String,
      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('Telegram', telegramSchema);
