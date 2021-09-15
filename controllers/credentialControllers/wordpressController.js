const Wordpress = require('../../models/socialCredentials/Wordpress');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Wordpress.find();
    if (!data) res.status(200).send('No credentials added yet!');

    try {
      filtered = data.map(({ wordpressConfig }) => {
        if (wordpressConfig && wordpressConfig[0]._id == id)
          return wordpressConfig;
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
      await Wordpress.create({
        wordpressConfig: conf,
      });

      res
        .status(200)
        .json({ success: true, message: 'Wordpress Configuration Added' });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: 'Something went wrong!' });
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);

    let { url, username, password, status, track } = req.body;

    try {
      if (url) {
        await Wordpress.updateOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'wordpressConfig.$.url': url } }
        );
      }

      if (username) {
        await Wordpress.updateOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'wordpressConfig.$.username': username } }
        );
      }

      if (password) {
        await Wordpress.updateOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $set: { 'wordpressConfig.$.password': password } }
        );
      }
      if (status) {
        await Wordpress.updateOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          {
            $set: {
              'wordpressConfig.$.status': status,
            },
          }
        );
      }
      res.status(201).json({
        success: true,
        message: 'Wordpress Configuration Updated Successfully',
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
    let { url, username, password, status, track } = req.body;
    try {
      if (url) {
        await Wordpress.deleteOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { url: url } }
        );
      }
      if (username) {
        await Wordpress.deleteOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { username: username } }
        );
      }
      if (password) {
        await Wordpress.deleteOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { password: password } }
        );
      }

      if (status) {
        await Wordpress.deleteOne(
          {
            wordpressConfig: { $elemMatch: { track: track, _id: id } },
          },
          { $pull: { status: status } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Wordpress Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!, Please try again',
      });
    }
  },
};
