const Telegram = require('../../models/socialCredentials/Telegram');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Telegram.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);
    const { channel, token } = req.body;
    try {
      await Telegram.create({
        _id,
        channel,
        token,
      });
      res
        .status(200)
        .json({ success: true, data: 'Telegram Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { channel, token } = req.body;

    try {
      if (token) {
        await Telegram.updateOne(
          {
            _id: id,
          },
          { $set: { token: token } }
        );
      }

      if (channel) {
        await Telegram.updateOne(
          { _id: id },
          { $addToSet: { channel: channel } }
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
          },
          { token: token }
        );
      }

      if (channel) {
        await Telegram.deleteOne({ _id: id }, { $pull: { channel: channel } });
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
