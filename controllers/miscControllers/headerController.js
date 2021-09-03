const Header = require('../../models/misc/Header');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Header.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded(req);

    const { header } = req.body;
    try {
      const user = await Header.create({
        _id,
        header,
      });
      res
        .status(200)
        .json({ success: true, data: 'Header Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { header } = req.body;

    try {
      if (header) {
        await Header.updateOne(
          {
            _id: id,
          },
          { $set: { header: header } }
        );
      }
      res.status(201).json({
        success: true,
        data: 'Header Configuration Updated Successfully',
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
    const { header } = req.body;
    try {
      if (header) {
        await Header.deleteOne(
          {
            _id: id,
          },
          { header: header }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Header Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
