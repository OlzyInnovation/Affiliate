const mongoose = require('mongoose');

const affilateSchema = new mongoose.Schema({
  _id: String,
  amazon_tag_id: String,
  earnkaro_referral_link: String,
  earnkaro_id: String,
  inr_deals_username: String,
  flipkart_affid: String,
  cuelinks_id: String,
  convert_amazon: String,
  convert_flipkart: String,
  convert_others: String,
  status: String,
});

module.exports = mongoose.model('Affiliates', affilateSchema);
