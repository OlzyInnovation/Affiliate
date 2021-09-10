const Facebook = require('../../models/socialCredentials/Facebook');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Facebook.findOne({ _id: id });

    if (!data) {
      res.status(400).send('No credentials added yet!');
    }

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);

    const { url, token } = req.body;
    try {
      await Facebook.create({
        _id,
        url,
        token,
      });
      res
        .status(200)
        .json({ success: true, data: 'Facebook Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { url, token, status } = req.body;

    try {
      if (token) {
        await Facebook.updateOne(
          {
            _id: id,
          },
          { $set: { token: token } }
        );
      }

      if (url) {
        await Facebook.updateOne({ _id: id }, { $set: { url: url } });
      }
      if (status) {
        await Facebook.updateOne({ _id: id }, { $set: { status: status } });
      }

      res.status(201).json({
        success: true,
        data: 'Facebook Configuration Updated Successfully',
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
    const { url, token, status } = req.body;
    try {
      if (token) {
        await Facebook.deleteOne(
          {
            _id: id,
          },
          { token: token }
        );
      }

      if (url) {
        await Facebook.deleteOne(
          {
            _id: id,
          },
          { url: url }
        );
      }

      if (status) {
        await Facebook.deleteOne(
          {
            _id: id,
          },
          { status: status }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Facebook Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
