const URLReplacer = require('../../models/misc/URLReplacer');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await URLReplacer.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);

    const { url, restore } = req.body;

    try {
      const user = await URLReplacer.create({
        _id,
        url,
        restore,
      });
      res
        .status(200)
        .json({ success: true, data: 'URLReplacer Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { url, restore } = req.body;

    try {
      if (url) {
        await URLReplacer.updateOne({ _id: id }, { $addToSet: { url: url } });
      }
      if (restore) {
        await URLReplacer.updateOne(
          { _id: id },
          { $addToSet: { restore: restore } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'URLReplacer Configuration Updated Successfully',
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
    const { url, restore } = req.body;
    try {
      if (url) {
        await URLReplacer.deleteOne({ _id: id }, { $pull: { url: url } });
      }

      if (restore) {
        await URLReplacer.deleteOne(
          { _id: id },
          { $pull: { restore: restore } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'URLReplacer Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
