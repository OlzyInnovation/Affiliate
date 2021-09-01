const Affiliate = require('../../models/misc/AffiliateSetting');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    _id = decoded();

    const data = await Affiliate.findOne({ _id: _id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },
  add: async (req, res, next) => {
    _id = decoded();

    const {
      amazon_tag_id,
      earnKaro_referral_link,
      inr_deals_username,
    } = req.body;
    try {
      const user = await Affiliate.create({
        _id,
        amazon_tag_id,
        earnKaro_referral_link,
        inr_deals_username,
      });
      res
        .status(200)
        .json({ success: true, data: 'Affiliate Configuration Added' });
    } catch (error) {
      return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    //Implement verifications & prevent double error
    // const data = await Affiliate.findOne({ _id: req.header._id });
    // if (!data) res.status(400).send('No credentials added yet!');
    // const AffiliateData = new Affiliate({
    //   _id: req.header._id,
    //   url: req.body.url,
    //   token: req.body.token,
    // });
    // try {
    //   const savedUser = await AffiliateData.save();
    //   res.send(savedUser);
    // } catch (err) {
    //   res.status(400).send(err);
    // }
  },
};
