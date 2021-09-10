const Wordpress = require('../../models/socialCredentials/Wordpress');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Wordpress.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);
    const { url, username, password } = req.body;

    try {
      await Wordpress.create({
        _id,
        url,
        username,
        password,
      });
      res
        .status(201)
        .json({ success: true, data: 'Wordpress config saved successfully' });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { url, username, password } = req.body;

    try {
      if (url) {
        await Wordpress.updateOne(
          {
            _id: id,
          },
          { $set: { url: url } }
        );
      }

      if (username) {
        await Wordpress.updateOne(
          { _id: id },
          { $set: { username: username } }
        );
      }
      if (password) {
        await Wordpress.updateOne(
          { _id: id },
          { $set: { password: password } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Wordpress Configuration Updated Successfully',
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
    const { url, username, password } = req.body;
    try {
      if (url) {
        await Wordpress.deleteOne(
          {
            _id: id,
          },
          { url: url }
        );
      }

      if (username) {
        await Wordpress.deleteOne(
          {
            _id: id,
          },
          { username: username }
        );
      }
      if (password) {
        await Wordpress.deleteOne(
          {
            _id: id,
          },
          { password: password }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Wordpress Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
