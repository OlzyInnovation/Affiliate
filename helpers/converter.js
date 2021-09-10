const jwt = require('jsonwebtoken');
const { decoded } = require('./decodedJWT');
const textReplacer = require('./textReplacer');
const urlReplacer = require('./urlReplacer');
const { iterate } = require('./iterate');
const shortener = require('./shortener');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);
    // const {convertamzn} = req.body;
    if (!id) return;
    try {
      const { dataField, convertType } = req.body;
      replaceText = await textReplacer(dataField, id);
      temp = replaceText;
      //Replaced string without url is stored here
      iterated = iterate(temp);
      replaceUrl = await urlReplacer(replaceText, convertType, id);
      // shortenUrl = await shortener(replaceUrl);
      res
        .status(200)
        .json({ success: true, data: [{ text: iterated, url: replaceUrl }] });
    } catch (err) {
      console.log(err);
    }
  },
};
