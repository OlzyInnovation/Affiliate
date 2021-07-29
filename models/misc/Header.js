const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  _id: String,
  header: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Header', headerSchema);
