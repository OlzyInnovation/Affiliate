const TextReplacer = require('../../models/misc/TextReplacer');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await TextReplacer.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();

    const { text, restore } = req.body;
    try {
      const user = await TextReplacer.create({
        _id,
        text,
        restore,
      });
      res
        .status(200)
        .json({ success: true, data: 'Replacement Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    //Implement verifications & prevent double error
    // const data = await TextReplacer.findOne({ _id: req.TextReplacer._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const TextReplacerData = new TextReplacer({
    //   _id: req.TextReplacer._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await TextReplacerData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
