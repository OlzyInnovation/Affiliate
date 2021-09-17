const extractUrls = require('extract-urls');
const urlExpand = require('url-expand');
const axios = require('axios');
const { shorten } = require('./shortener');
const URLReplacer = require('../models/misc/URLReplacer');
const Affiliate = require('../models/misc/AffiliateSetting');

exports.urlReplacer = async (url, id) => {
  let new_url;

  const data = await Affiliate.findOne({ _id: id });
  if (!data) return;
  const replaceData = await URLReplacer.find();
  filtered = replaceData.map(({ urlConfig }) => {
    if (urlConfig && urlConfig[0]._id == id) return urlConfig;
  });
  urls = extractUrls(url, true);
  fullUrl = urls[0];
  final = urlExpand(fullUrl);

  try {
    if (filtered) {
      find = filtered.url;
      restore = filtered.restore;

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

    let convert_amzn = data.convert_amazon;
    let convert_flip = data.convert_flipkart;
    let convert_others = data.convert_others;

    domain = new URL(final);
    host = domain.hostname;
    params = domain.searchParams;

    if (convert_amzn == 'amazon' && host.includes('amazon')) {
      amzn_tag_id = data.amazon_tag_id;
      params.set('tag', amzn_tag_id);
      domain.search = params.toString();
      new_url = domain.toString();
    } else if (convert_flip == 'flipkart' && host.includes('flipkart')) {
      inr_deals_uname = data.inr_deals_username;
      params.set('affid', inr_deals_uname);
      new_url = domain.toString();
    } else {
      if (
        (convert_amzn == 'inrdeals' && host.includes('amazon')) ||
        (convert_flip == 'inrdeals' && host.includes('flipkart')) ||
        convert_others == 'inrdeals'
      ) {
        new_url = `https://inr.deals/track?id=${data.inr_deals_username}&src=affiliaters&url=${domain}`;
      }

      if (
        (convert_amzn == 'cuelinks' && host.includes('amazon')) ||
        (convert_flip == 'cuelinks' && host.includes('flipkart')) ||
        convert_others == 'cuelinks'
      ) {
        new_url = `https://linksredirect.com/?cid=${data.cuelinks_id}&source=linkkit&url=${domain}`;
      }

      if (
        (convert_amzn == 'earnkaro' && host.includes('amazon')) ||
        (convert_flip == 'earnkaro' && host.includes('flipkart')) ||
        convert_others == 'earnkaro'
      ) {
        const instance = axios.create({
          headers: {
            'x-api-key': 'h16BYF2WhS6xQ7FYXKuTTLhKSfVPQ6z2MBTvZIyg',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)',
          },
        });

        var datatopost = {
          data: {
            type: 'createexternalearnlink',
            attributes: {
              userid: data.earnkaro_id,
              links: [`${domain}`],
              ip_address: '10.0.0.1',
            },
          },
        };

        instance
          .post('https://middleware.ckaro.in/api/convert/ekaro', datatopost)
          .then(({ data }) => {
            new_url = data.data[0].ekaro_url;
          });
      }
    }
    return new_url;
  } catch (err) {
    console.log(err);
  }
};
