const { decoded } = require('./decodedJWT');
const textReplacer = require('./textReplacer');
const urlReplacer = require('./urlReplacer');
const shortener = require('./shortener');

module.exports = {
  index: async (req, res, next) => {
    const { dataField } = req.body;
    replaceText = await textReplacer(dataField);
    replaceUrl = await urlReplacer(replaceText);
    shortenUrl = await shortener(replaceUrl);
  },
};
