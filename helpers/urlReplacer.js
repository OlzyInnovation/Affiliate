const extractUrls = require('extract-urls');
const urlExpand = require('url-expand');
const { shorten } = require('./shortener');
const URLReplacer = require('../models/misc/URLReplacer');
const Affiliate = require('../models/misc/AffiliateSetting');

exports.urlReplacer = async (url, convertType, id) => {
  let new_url;
  const data = await Affiliate.findOne({ id });
  const replaceData = await URLReplacer.findOne({ id });
  if (!data) return;
  urls = extractUrls(url, true);
  fullUrl = urls[0];
  final = urlExpand(fullUrl);

  try {
    if (replaceData) {
      find = replaceData.url;
      restore = replaceData.restore;
      // final = expandedUrl;

      for (let i = find.length - 1; i >= 0; i--) {
        final = final.replace(
          RegExp(
            '\\b' + find[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b',
            'g'
          ),
          restore[i]
        );
      }
    }
    domain = new URL(final);
    host = domain.hostname;
    params = domain.searchParams;
    if (
      (convertType == 'amazon' && host.includes('amzn')) ||
      host.includes('amazon')
    ) {
      amzn_tag_id = data.amazon_tag_id || '';
      params.set('tag', amzn_tag_id);
      domain.search = params.toString();
      new_url = domain.toString();
    } else if (convertType == 'flipkart' && host.includes('flipkart')) {
      inr_deals_uname = data.inr_deals_username || '';
      params.set('affid', inr_deals_uname);
      new_url = domain.toString();
    } else {
      // new_url = domain;
      // if (convertamazon == 'inrde')
    }

    shortened_link = shorten(new_url);
    return shortened_link;
  } catch (err) {
    console.log(err);
  }
};

//  else if (
//       (convertType == 'earnkaro' && host.includes('earnkaro')) ||
//       host.includes('linkredirect')

//     ) {
//       earnkaro_ref_link = data.earnkaro_referral_link || '';
//       params.set('dl', earnkaro_ref_link);
//       new_url = domain.toString();
//     }

// if(convertamzn == 'amazon' && host.includes('amazon')){
//   amzn_tag_id = data.amazon_tag_id || '';
//   params.set('tag', amzn_tag_id);
//   domain.search = params.toString();
//   new_url = domain.toString();
// }else if(convertflip == 'flipkart' && host.includes('flipkart')){
//     inr_deals_uname = data.inr_deals_username || '';
//     params.set('affid', inr_deals_uname);
//     new_url = domain.toString();
// }else {
//   if (
//     (convertamzn == 'inrdeals' && host.includes('amazon')) ||
//     (convertflip == 'inrdeals' && host.includes('flipkart')) ||
//     (convertother == 'inrdeals')
//   ) {
//     new_url = `https://inr.deals/track?id=${data.inr_deals_username}&src=affiliaters&url=${domain}`
//   }

//   if (
//     (convertamzn == 'cuelinks' && host.includes('amazon')) ||
//     (convertflip == 'cuelinks' && host.includes('flipkart')) ||
//     convertother == 'cuelinks'
//   ) {
//     new_url = `https://linksredirect.com/?cid=${data.cuelinks_id&}source=linkkit&url=${domain}`;

//   }

//   if (
//     (convertamzn == 'earnkaro' && host.includes('amazon')) ||
//     (convertflip == 'earnkaro' && host.includes('flipkart')) ||
//     convertother == 'earnkaro'
//   ) {
//     const instance = axios.create({
//   headers: { 'x-api-key': 'h16BYF2WhS6xQ7FYXKuTTLhKSfVPQ6z2MBTvZIyg', 'Accept': 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)' }
// });

// var datatopost = {
//   "data": {
//     "type": "createexternalearnlink",
//     "attributes": {
//       "userid": 91056,
//       "links": [
//         'https://www.myntra.com'
//       ],
//       "ip_address": "10.0.0.1"
//     }
//   }
// }
// instance.post('https://middleware.ckaro.in/api/convert/ekaro', datatopost)
//   .then(function(response) {
//          var converted_url = response.data.data[0].ekaro_url
// }
//   //   earnkaro_referral_link: String,
//   // earnkaro_id: String,
//     new_url = `https://linksredirect.com/?cid=${data.cuelinks_id&}source=linkkit&url=${domain}`;

//   }
// }
