const mongoose = require('mongoose');

const urlReplacerSchema = new mongoose.Schema({
  _id: String,
  url: [{ type: String }],
  restore: [{ type: String }],
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('URLReplacer', urlReplacerSchema);
