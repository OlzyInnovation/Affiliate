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
    id = decoded(req);

    let conf = req.body;
    conf._id = id;
    try {
      const user = await Header.create({
        conf,
      });
      res
        .status(200)
        .json({ success: true, data: 'Header Configuration Added' });
    } catch (error) {
      // return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const { header, status } = req.body;

    try {
      if (header) {
        await Header.updateOne(
          {
            _id: id,
          },
          { $set: { header: header } }
        );
      }
      if (status) {
        await Header.updateOne(
          {
            _id: id,
          },
          { $set: { status: status } }
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
    const { header, status } = req.body;
    try {
      if (header) {
        await Header.deleteOne(
          {
            _id: id,
          },
          { header: header }
        );
      }
      if (status) {
        await Header.updateOne(
          {
            _id: id,
          },
          { $unset: { status: '0' } }
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
