const Facebook = require('../../models/socialCredentials/Facebook');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Facebook.find();
    if (!data) res.status(200).send('No credentials added yet!');

    try {
      filtered = data.map(({ facebookConfig }) => {
        if (facebookConfig && facebookConfig[0]._id == id)
          return facebookConfig;
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
      await Facebook.create({
        facebookConfig: conf,
      });

      res
        .status(200)
        .json({ success: true, message: 'Facebook Configuration Added' });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: 'Something went wrong!' });
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    let { url, token, status, track } = req.body;

    try {
      if (url) {
        await Facebook.updateOne(
          {
            facebookConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'facebookConfig.$.url': url } }
        );
      }

      if (token) {
        await Facebook.updateOne(
          {
            facebookConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'facebookConfig.$.token': token } }
        );
      }

      if (status) {
        await Facebook.updateOne(
          {
            facebookConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'facebookConfig.$.status': status } }
        );
      }
      res.status(201).json({
        success: true,
        message: 'Facebook Configuration Updated Successfully',
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
    const { url, token, status, track } = req.body;
    try {
      if (url) {
        await Facebook.deleteOne(
          {
            facebookConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { url: url } }
        );
      }
      if (token) {
        await Facebook.deleteOne(
          {
            facebookConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { token: token } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Facebook Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!, Please try again',
      });
    }
  },
};
