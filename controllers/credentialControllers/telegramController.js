const { v4: uuidv4 } = require('uuid');
const Telegram = require('../../models/socialCredentials/Telegram');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Telegram.findOne({ _id: id });

    if (!data) res.status(200).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    id = decoded(req);
    let conf = req.body;
    generate = uuidv4();
    conf._id = id;
    conf.status = 0;
    conf.track = generate;

    try {
      await Telegram.create({
        channels: conf,
      });

      res
        .status(200)
        .json({ success: true, message: 'Telegram Configuration Added' });
    } catch (error) {
      // return next(new ErrorResponse('Something went wrong!', 500));
      res
        .status(400)
        .json({ success: false, message: 'Something went wrong!' });
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    let { channel, token, status, track } = req.body;

    try {
      if (token) {
        await Telegram.updateOne(
          {
            _id: id,
            channels: { $elemMatch: { track: track } },
          },
          { $set: { 'channels.$.token': token } }
        );
      }

      if (channel) {
        await Telegram.updateOne(
          {
            _id: id,
            channels: { $elemMatch: { track: track } },
          },
          { $set: { 'channels.$.channel': channel } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Telegram Configuration Updated Successfully',
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
    const { channel, token } = req.body;
    try {
      if (token) {
        await Telegram.deleteOne(
          {
            _id: id,
            channels: { $elemMatch: { track: track } },
          },
          { $pull: { token: token } }
        );
      }

      if (channel) {
        await Telegram.deleteOne(
          { _id: id, channels: { $elemMatch: { track: track } } },
          { $pull: { channel: channel } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Telegram Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
