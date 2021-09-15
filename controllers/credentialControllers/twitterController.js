const Twitter = require('../../models/socialCredentials/Twitter');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Twitter.find();
    if (!data) res.status(200).send('No credentials added yet!');

    try {
      filtered = data.map(({ twitterConfig }) => {
        if (twitterConfig && twitterConfig[0]._id == id) return twitterConfig;
      });

      res.status(200).send(filtered);
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: 'Something went wrong!' });
    }
  },
  add: async (req, res, next) => {
    id = decoded(req);
    let conf = req.body;
    generate = uuidv4();
    conf._id = id;
    conf.status = '0';
    conf.track = generate;

    try {
      await Twitter.create({
        twitterConfig: conf,
      });

      res
        .status(200)
        .json({ success: true, message: 'Twitter Configuration Added' });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: 'Something went wrong!' });
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    let {
      consumer_key,
      consumer_secret,
      access_token,
      access_token_secret,
      status,
      track,
    } = req.body;

    try {
      if (consumer_key) {
        await Twitter.updateOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'twitterConfig.$.consumer_key': consumer_key } }
        );
      }

      if (consumer_secret) {
        await Twitter.updateOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'twitterConfig.$.consumer_secret': consumer_secret } }
        );
      }

      if (access_token) {
        await Twitter.updateOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'twitterConfig.$.access_token': access_token } }
        );
      }
      if (access_token_secret) {
        await Twitter.updateOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          {
            $set: {
              'twitterConfig.$.access_token_secret': access_token_secret,
            },
          }
        );
      }
      if (status) {
        await Twitter.updateOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          {
            $set: {
              'twitterConfig.$.status': status,
            },
          }
        );
      }
      res.status(201).json({
        success: true,
        message: 'Twitter Configuration Updated Successfully',
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!, Please try again',
      });
    }
  },

  delete: async (req, res, next) => {
    id = decoded(req);
    let {
      consumer_key,
      consumer_secret,
      access_token,
      access_token_secret,
      status,
      track,
    } = req.body;
    try {
      if (consumer_key) {
        await Twitter.deleteOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { consumer_key: consumer_key } }
        );
      }
      if (consumer_secret) {
        await Twitter.deleteOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { consumer_secret: consumer_secret } }
        );
      }
      if (access_token) {
        await Twitter.deleteOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { access_token: access_token } }
        );
      }
      if (access_token_secret) {
        await Twitter.deleteOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { access_token_secret: access_token_secret } }
        );
      }
      if (status) {
        await Twitter.deleteOne(
          {
            twitterConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { status: status } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Twitter Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!, Please try again',
      });
    }
  },
};
