const TextReplacer = require('../../models/misc/TextReplacer');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await TextReplacer.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);

    const { text, restore } = req.body;
    try {
      const user = await TextReplacer.create({
        _id,
        text,
        restore,
      });
      res
        .status(200)
        .json({ success: true, data: 'TextReplacer Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { text, restore } = req.body;

    try {
      if (text) {
        await TextReplacer.updateOne(
          { _id: id },
          { $addToSet: { text: text } }
        );
      }
      if (restore) {
        await TextReplacer.updateOne(
          { _id: id },
          { $addToSet: { restore: restore } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'TextReplacer Configuration Updated Successfully',
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
    const { text, restore } = req.body;
    try {
      if (text) {
        await TextReplacer.deleteOne({ _id: id }, { $pull: { text: text } });
      }

      if (restore) {
        await TextReplacer.deleteOne(
          { _id: id },
          { $pull: { restore: restore } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'TextReplacer Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
