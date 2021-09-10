const extractUrls = require('extract-urls');

exports.iterate = async (text) => {
  final = text;
  urls = extractUrls(final, true);

  for (let i = final.length - 1; i >= 0; i--) {
    final = final.replace(urls[i], '');
  }

  return final;
};
