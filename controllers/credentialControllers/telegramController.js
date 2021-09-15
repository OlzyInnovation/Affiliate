const { v4: uuidv4 } = require('uuid');
const Telegram = require('../../models/socialCredentials/Telegram');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Telegram.find();
    if (!data) res.status(200).send('No credentials added yet!');

    try {
      filtered = data.map(({ telegramChannels }) => {
        if (telegramChannels && telegramChannels[0]._id == id)
          return telegramChannels;
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
      await Telegram.create({
        telegramChannels: conf,
      });

      res
        .status(200)
        .json({ success: true, message: 'Telegram Configuration Added' });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: 'Something went wrong!' });
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    let { token, channel, status, track } = req.body;

    try {
      if (token) {
        await Telegram.updateOne(
          {
            telegramChannels: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'telegramChannels.$.token': token } }
        );
      }

      if (channel) {
        await Telegram.updateOne(
          {
            telegramChannels: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'telegramChannels.$.channel': channel } }
        );
      }
      if (status) {
        await Telegram.updateOne(
          {
            telegramChannels: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'telegramChannels.$.status': status } }
        );
      }
      res.status(201).json({
        success: true,
        message: 'Telegram Configuration Updated Successfully',
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
    const { channel, token, track } = req.body;
    try {
      if (token) {
        await Telegram.deleteOne(
          {
            telegramChannels: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { token: token } }
        );
      }

      if (channel) {
        await Telegram.deleteOne(
          {
            telegramChannels: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { channel: channel } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Telegram Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!, Please try again',
      });
    }
  },
};
