const jwt = require('jsonwebtoken');
const Telegram = require('../../models/socialCredentials/Telegram');

module.exports = {
  index: async (req, res, next) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const data = await Telegram.findOne({ _id: decoded._id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const telegramData = new Telegram({
      _id: decoded._id,
      url: req.body.url,
      token: req.body.token,
      channel: req.body.channel,
    });

    try {
      const savedUser = await telegramData.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  update: async (req, res, next) => {
    //Implement verifications & prevent double error
    const data = await Telegram.findOne({ _id: req.header._id });

    if (!data) res.status(400).send('No credentials added yet!');
    const telegramData = new Telegram({
      _id: req.header._id,
      url: req.body.url,
      token: req.body.token,
    });

    try {
      const savedUser = await telegramData.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
