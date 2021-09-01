const jwt = require('jsonwebtoken');
const Wordpress = require('../../models/socialCredentials/Wordpress');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await Wordpress.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();
    const { url, username, password } = req.body;

    try {
      const user = await Wordpress.create({
        _id,
        url,
        username,
        password,
      });
      res
        .status(201)
        .json({ success: true, data: 'Wordpress config saved successfully' });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  update: async (req, res, next) => {
    //   const data = await Wordpress.findOne({ _id: req.header._id });
    //   if (!data) res.status(400).send('No credentials added yet!');
    //   const wordpressData = new Wordpress({
    //     _id: req.header._id,
    //     url: req.body.url,
    //     token: req.body.token,
    //   });
    //   try {
    //     const savedUser = await wordpressData.save();
    //     // res.send(savedUser);
    //     res.send(savedUser);
    //   } catch (err) {
    //     res.status(400).send(err);
    //   }
  },
};
