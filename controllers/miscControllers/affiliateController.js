const Affiliate = require('../../models/misc/AffiliateSetting');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Affiliate.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },

  add: async (req, res, next) => {
    _id = decoded(req);

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
    id = decoded(req);
    const {
      amazon_tag_id,
      earnKaro_referral_link,
      inr_deals_username,
    } = req.body;

    try {
      if (amazon_tag_id) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $set: { amazon_tag_id: amazon_tag_id } }
        );
      }

      if (earnKaro_referral_link) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { earnKaro_referral_link: earnKaro_referral_link } }
        );
      }
      if (inr_deals_username) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { inr_deals_username: inr_deals_username } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Affiliate Configuration Updated Successfully',
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
    const {
      amazon_tag_id,
      earnKaro_referral_link,
      inr_deals_username,
    } = req.body;
    try {
      if (amazon_tag_id) {
        await Affiliate.deleteOne(
          {
            _id: id,
          },
          { amazon_tag_id: amazon_tag_id }
        );
      }

      if (earnKaro_referral_link) {
        await Affiliate.deleteOne(
          {
            _id: id,
          },
          { earnKaro_referral_link: earnKaro_referral_link }
        );
      }
      if (inr_deals_username) {
        await Affiliate.deleteOne(
          {
            _id: id,
          },
          { inr_deals_username: inr_deals_username }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Affiliate Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
