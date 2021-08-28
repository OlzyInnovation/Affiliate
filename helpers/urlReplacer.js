const extractUrls = require('extract-urls');
const urlExpand = require('url-expand');
const pricefinder = require('pricefinder-ecommerce');
const { decoded } = require('./decodedJWT');
const { shorten } = require('./shortener');
const URLReplacer = require('../models/misc/URLReplacer');
const Affiliate = require('../models/misc/AffiliateSetting');

exports.urlReplacer = async (url) => {
  original = url;
  id = decoded();
  const data = await Affiliate.findOne({ _id: id });
  if (!data) {
    return { msg: 'no Affiliate Settings' };
  }
  urls = extractUrls(url, true);
  fullUrl = urls[0];
  expandedUrl = urlExpand(fullUrl);
  domain = new URL(expandedUrl);
  host = domain.hostname;
  params = new URLSearchParams(domain.search);
  if (host.includes('amzn') || host.includes('amazon')) {
    sth = await pricefinder(domain, 'amazon');
    domain = params.set('tag', data.Amazon_tag_id);
  } else if (host.includes('earnkaro') || host.includes('linkredirect')) {
    sth = 'Image Preview';
    domain = params.set('dl', data.EarnKaro_Referral_Link);
  } else if (host.includes('flipkart')) {
    sth = await pricefinder(domain, 'amazon');
    domain = params.set('affid', data.INR_deals_username);
  } else {
  }

  shortened_link = shorten(domain);
  return { product_details: sth, link: shortened_link, org: original };
};
