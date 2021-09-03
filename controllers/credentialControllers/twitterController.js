const Twitter = require('../../models/socialCredentials/Twitter');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);
    const data = await Twitter.findOne({ _id: id });
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
      await Twitter.create({
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
    id = decoded(req);
    const { consumer_key, consumer_secret, access_token, access_token_secret } = req.body;

    try {
      if (consumer_key) {
        await Twitter.updateOne(
          {
            _id: id,
          },
          { $set: { consumer_key: consumer_key } }
        );
      }

      if (consumer_secret) {
        await Twitter.updateOne({ _id: id }, { $set: { consumer_secret: consumer_secret } });
      }
      if (access_token) {
        await Twitter.updateOne({ _id: id }, { $set: { access_token: access_token } });
      }
      if (access_token_secret) {
        await Twitter.updateOne({ _id: id }, { $set: { access_token_secret: access_token_secret } });
      }

      res.status(201).json({
        success: true,
        data: 'Twitter Configuration Updated Successfully',
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },

  delete: async (req, res, next) => {
    id = decoded(req);
    const { consumer_key, consumer_secret, access_token, access_token_secret } = req.body;
    try {
      if (consumer_key) {
        await Twitter.remove(
          {
            _id: id,
          },
          { consumer_key: consumer_key }
        );
      }

      if (consumer_secret) {
        await Twitter.remove({ _id: id }, { consumer_secret: consumer_secret } );
      }
      if (access_token) {
        await Twitter.remove({ _id: id }, { access_token: access_token });
      }
      if (access_token_secret) {
        await Twitter.remove({ _id: id },  { access_token_secret: access_token_secret  });
      }

      res.status(201).json({
        success: true,
        data: 'Twitter Configuration Updated Successfully',
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
};

