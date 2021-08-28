const jwt = require('jsonwebtoken');
const Telegram = require('../../models/socialCredentials/Telegram');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await Telegram.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();
    const { _id, url, token, channel } = req.body;
    try {
      const user = await Telegram.create({
        _id,
        url,
        token,
        channel,
      });
      res
        .status(200)
        .json({ success: true, data: 'Telegram Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    //Implement verifications & prevent double error
    // const data = await Telegram.findOne({ _id: req.header._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const telegramData = new Telegram({
    //   _id: req.header._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await telegramData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
