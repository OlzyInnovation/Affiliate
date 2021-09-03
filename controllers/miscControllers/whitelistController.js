const Whitelist = require('../../models/misc/Whitelist');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Whitelist.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);

    const { websites } = req.body;
    try {
      const user = await Whitelist.create({
        _id,
        websites,
      });
      res
        .status(200)
        .json({ success: true, data: 'Whitelist Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { websites } = req.body;

    try {
      if (websites) {
        await Whitelist.updateOne(
          { _id: id },
          { $addToSet: { websites: websites } }
        );
      }
      res.status(201).json({
        success: true,
        data: 'Whitelist Configuration Updated Successfully',
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
    const { websites } = req.body;
    try {
      if (websites) {
        await Whitelist.deleteOne(
          { _id: id },
          { $pull: { websites: websites } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Whitelist Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
