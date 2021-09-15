const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  _id: String,
  header: String,
  status: String,
});

module.exports = mongoose.model('Header', headerSchema);
