const Whitelist = require('../../models/misc/Whitelist');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await Whitelist.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();

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
    //Implement verifications & prevent double error
    // const data = await Whitelist.findOne({ _id: req.Whitelist._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const WhitelistData = new Whitelist({
    //   _id: req.Whitelist._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await WhitelistData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
