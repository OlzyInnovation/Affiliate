const OwnShortener = require('../../models/misc/OwnShortener');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await OwnShortener.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);

    const { shortener } = req.body;
    try {
      const user = await OwnShortener.create({
        _id,
        shortener,
      });
      res
        .status(200)
        .json({ success: true, data: 'Shortener Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { shortener } = req.body;

    try {
      if (shortener) {
        await OwnShortener.updateOne(
          {
            _id: id,
          },
          { $set: { shortener: shortener } }
        );
      }
      res.status(201).json({
        success: true,
        data: 'Shortener Configuration Updated Successfully',
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
    const { shortener } = req.body;
    try {
      if (shortener) {
        await OwnShortener.deleteOne(
          {
            _id: id,
          },
          { shortener: shortener }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Shortener Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
