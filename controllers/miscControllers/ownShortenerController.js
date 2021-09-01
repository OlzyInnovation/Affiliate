const OwnShortener = require('../../models/misc/OwnShortener');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await OwnShortener.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();

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
    //Implement verifications & prevent double error
    // const data = await OwnShortener.findOne({ _id: req.OwnShortener._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const OwnShortenerData = new OwnShortener({
    //   _id: req.OwnShortener._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await OwnShortenerData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
