const mongoose = require('mongoose');

const urlReplacerSchema = new mongoose.Schema({
  urlConfig: [
    {
      _id: String,
      url: String,
      restore: String,
      status: String,
      track: String,
    },
  ],
});

module.exports = mongoose.model('URLReplacer', urlReplacerSchema);
