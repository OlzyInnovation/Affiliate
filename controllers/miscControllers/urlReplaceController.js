const URLReplacer = require('../../models/misc/URLReplacer');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await URLReplacer.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();

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
    //Implement verifications & prevent double error
    // const data = await URLReplacer.findOne({ _id: req.URLReplacer._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const URLReplacerData = new URLReplacer({
    //   _id: req.URLReplacer._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await URLReplacerData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
