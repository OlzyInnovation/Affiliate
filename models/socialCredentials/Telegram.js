const mongoose = require('mongoose');

//Previous Schema
// const telegramSchema = new mongoose.Schema({
//   _id: String,
//   channel: [{ type: String }],
//   token: String,
//   status: {
//     type: Number,
//     default: 0,
//   },
// });

const telegramSchema = new mongoose.Schema({
  channels: [
    {
      _id: String,
      channel: String,
      token: String,
      status: Number,
      track: String,
    },
  ],
});

module.exports = mongoose.model('Telegram', telegramSchema);
