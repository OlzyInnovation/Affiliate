const jwt = require('jsonwebtoken');
const { decoded } = require('./decodedJWT');
const textReplacer = require('./textReplacer');
const urlReplacer = require('./urlReplacer');
const iterateText = require('./iterate');
const shortener = require('./shortener');

module.exports = {
  index: async (req, res, next) => {
    const { dataField } = req.body;
    replaceText = await textReplacer(dataField);
    temp = replaceText;
    iterated = iterateText(temp);
    replaceUrl = await urlReplacer(replaceText);
    // shortenUrl = await shortener(replaceUrl);
    return replaceUrl;
  },
};
