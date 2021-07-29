const jwt = require('jsonwebtoken');
const Facebook = require('../../models/socialCredentials/Facebook');

module.exports = {
  index: async (req, res, next) => {
    res.header('auth-token', token).send(token);

    const data = await Facebook.findOne({ _id: req.header._id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    const facebookData = new Facebook({
      _id: req.header._id,
      url: req.body.url,
      token: req.body.token,
    });

    try {
      const savedUser = await facebookData.save();
      // res.send(savedUser);
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  update: async (req, res, next) => {
    const data = await Facebook.findOne({ _id: req.header._id });

    if (!data) res.status(400).send('No credentials added yet!');
    const facebookData = new Facebook({
      _id: req.header._id,
      url: req.body.url,
      token: req.body.token,
    });

    try {
      const savedUser = await facebookData.save();
      // res.send(savedUser);
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
