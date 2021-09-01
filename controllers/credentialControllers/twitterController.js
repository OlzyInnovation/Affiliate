const Twitter = require('../../models/socialCredentials/Twitter');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded(req);
    const data = await Twitter.findOne({ _id: _id });
    if (!data) res.status(400).send('No credentials added yet!');
    res.send(data);
  },

  add: async (req, res, next) => {
    _id = decoded(req);
    const {
      consumer_key,
      consumer_secret,
      access_token,
      access_token_secret,
    } = req.body;
    try {
      const user = await Twitter.create({
        _id,
        consumer_key,
        consumer_secret,
        access_token,
        access_token_secret,
      });
      res
        .status(201)
        .json({ success: true, data: 'Twitter config saved successfully' });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  update: async (req, res, next) => {
    // const data = await Twitter.findOne({ _id: req.header._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const twitterData = new Twitter({
    //   _id: req.header._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await twitterData.save();
    //   // res.send(savedUser);
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
