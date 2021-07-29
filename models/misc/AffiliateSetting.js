const mongoose = require('mongoose');

const affilateSchema = new mongoose.Schema({
  _id: String,
  Amazon_tag_id: String,
  EarnKaro_Referral_Link: String,
  INR_deals_username: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Affiliates', affilateSchema);
