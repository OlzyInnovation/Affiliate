const Header = require('../../models/misc/Header');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await Header.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();

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
    //Implement verifications & prevent double error
    // const data = await Header.findOne({ _id: req.header._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const HeaderData = new Header({
    //   _id: req.header._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await HeaderData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
