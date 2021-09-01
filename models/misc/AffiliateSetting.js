const mongoose = require('mongoose');

const affilateSchema = new mongoose.Schema({
  _id: String,
  amazon_tag_id: String,
  earnkaro_referral_link: String,
  inr_deals_username: String,
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Affiliates', affilateSchema);
